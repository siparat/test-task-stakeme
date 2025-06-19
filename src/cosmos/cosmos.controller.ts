import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CosmosBlockDto } from './dto/cosmos-block.dto';
import { N0okGateway } from './gateways/n0ok.gateway';

@Controller('cosmos')
export class CosmosController {
	constructor(private n0okGateway: N0okGateway) {}

	@Get('block/:height')
	async getBlockByHeight(@Param('height', ParseIntPipe) height: number): Promise<CosmosBlockDto> {
		const response = await this.n0okGateway.getBlockByHeight(height);
		const dto = new CosmosBlockDto();
		dto.height = Number(response.block.header.height);
		dto.time = new Date(response.block.header.time);
		dto.hash = response.block_id.hash;
		dto.proposedAddress = response.block.header.proposer_address;
		return dto;
	}
}
