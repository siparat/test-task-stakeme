import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CosmosBlockDto } from './dto/cosmos-block.dto';
import { N0okGateway } from './gateways/n0ok.gateway';
import { ParseHashPipe } from 'src/pipes/parse-hash.pipe';
import { CosmosTransactionDto } from './dto/cosmos-transaction.dto';

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

		if (!blockResponse.block) {
			throw new NotFoundException('Block not found');
		}

		const dto = new CosmosTransactionDto();
		dto.hash = '0x' + transactionResponse.hash;
		dto.height = '0x' + Number(transactionResponse.height).toString(16);
		dto.time = new Date(blockResponse.block.header.time);
		dto.fee = '0x' + (Number(transactionResponse.tx_result.gas_used) * 0.01).toString(16);
		dto.gasUsed = transactionResponse.tx_result.gas_used
			? '0x' + parseInt(transactionResponse.tx_result.gas_used, 16)
			: '0x0';
		dto.gasWanted = transactionResponse.tx_result.gas_wanted
			? '0x' + parseInt(transactionResponse.tx_result.gas_wanted, 16)
			: '0x0';
		dto.sender = transactionResponse.tx_result.evm_tx_info.senderAddress;

		return dto;
	}
}
