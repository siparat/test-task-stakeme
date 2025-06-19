import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CosmosBlockDto } from './dto/cosmos-block.dto';
import { N0okGateway } from './gateways/n0ok.gateway';
import { ParseHashPipe } from 'src/pipes/parse-hash.pipe';
import { CosmosTransactionDto } from './dto/cosmos-transaction.dto';
import { decodeTxRaw } from '@cosmjs/proto-signing';
import { fromBase64 } from '@cosmjs/encoding';

@Controller('cosmos')
export class CosmosController {
	constructor(private n0okGateway: N0okGateway) {}

	@Get('block/:height')
	async getBlockByHeight(@Param('height', ParseIntPipe) height: number): Promise<CosmosBlockDto> {
		const response = await this.n0okGateway.getBlockByHeight(height);
		if (!response.block) {
			throw new NotFoundException('Block not found');
		}
		const dto = new CosmosBlockDto();
		dto.height = '0x' + Number(response.block.header.height).toString(16);
		dto.time = new Date(response.block.header.time);
		dto.hash = '0x' + response.block_id.hash;
		dto.proposedAddress = '0x' + response.block.header.proposer_address;
		return dto;
	}

	@Get('transaction/:hash')
	async getTransactionByHash(@Param('hash', ParseHashPipe) hash: string): Promise<CosmosTransactionDto> {
		const transactionResponse = await this.n0okGateway.getTransactionByHash(hash.split('0x')[1]);
		const blockResponse = await this.n0okGateway.getBlockByHeight(Number(transactionResponse.height));
		const blockTime = new Date(blockResponse.block!.header.time);

		const rawTx = transactionResponse.tx;
		const txBytes = fromBase64(rawTx);
		const decodedTx = decodeTxRaw(txBytes);

		const feeAmount = decodedTx.authInfo.fee?.amount[0];

		const dto = new CosmosTransactionDto();
		dto.hash = '0x' + transactionResponse.hash;
		dto.height = '0x' + Number(transactionResponse.height).toString(16);
		dto.time = blockTime;
		dto.fee = feeAmount ? '0x' + Number(feeAmount.amount).toString(16) : '0x0';
		dto.gasUsed = transactionResponse.gas_used ? transactionResponse.gas_used?.toString(16) : '0x0';
		dto.gasWanted = transactionResponse.gas_wanted ? transactionResponse.gas_wanted?.toString(16) : '0x0';
		dto.sender =
			decodedTx.authInfo.signerInfos[0].publicKey?.typeUrl === '/cosmos.crypto.secp256k1.PubKey'
				? Buffer.from(decodedTx.authInfo.signerInfos[0].publicKey.value).toString()
				: null;

		return dto;
	}
}
