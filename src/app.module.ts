import { Module } from '@nestjs/common';
import { EvmModule } from './evm/evm.module';
import { ConfigModule } from '@nestjs/config';
import { CosmosModule } from './cosmos/cosmos.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), EvmModule, CosmosModule]
})
export class AppModule {}
