import { Module } from '@nestjs/common';
import { EvmController } from './evm.controller';
import { PublicNodeGateway } from './gateways/public-node.gateway';
import { HttpModule } from '@nestjs/axios';
import { getPublicNodeHttpConfig } from 'src/configs/public-node-http.config';

@Module({
	imports: [HttpModule.registerAsync(getPublicNodeHttpConfig())],
	controllers: [EvmController],
	providers: [PublicNodeGateway]
})
export class EvmModule {}
