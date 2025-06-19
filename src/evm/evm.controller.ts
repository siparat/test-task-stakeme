import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EvmBlockDto } from './dto/evm-block.dto';
import { PublicNodeGateway } from './gateways/public-node.gateway';
import { plainToInstance } from 'class-transformer';

@Controller('evm')
export class EvmController {
	constructor(private publicNodeGateway: PublicNodeGateway) {}

	@Get('block/:height')
	async getBlockByHeight(@Param('height', ParseIntPipe) height: number): Promise<EvmBlockDto> {
		const response = await this.publicNodeGateway.getBlockByHeight(height);
		return plainToInstance(EvmBlockDto, { ...response.result, height }, { excludeExtraneousValues: true });
	}
}
