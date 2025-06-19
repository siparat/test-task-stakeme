import { Module } from '@nestjs/common';
import { EvmModule } from './evm/evm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), EvmModule]
})
export class AppModule {}
