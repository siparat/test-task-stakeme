import { HttpModuleAsyncOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getN0okHttpConfig = (): HttpModuleAsyncOptions => ({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (config: ConfigService) => ({
		baseURL: config.getOrThrow('N0OK_BASE_URL')
	})
});
