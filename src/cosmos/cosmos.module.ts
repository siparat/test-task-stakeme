import { Module } from '@nestjs/common';
import { CosmosController } from './cosmos.controller';
import { N0okGateway } from './gateways/n0ok.gateway';
import { HttpModule } from '@nestjs/axios';
import { getN0okHttpConfig } from 'src/configs/n0ok-http.config';

@Module({
	imports: [HttpModule.registerAsync(getN0okHttpConfig())],
	controllers: [CosmosController],
	providers: [N0okGateway]
})
export class CosmosModule {}
