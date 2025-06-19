import { HttpModuleAsyncOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getPublicNodeHttpConfig = (): HttpModuleAsyncOptions => ({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (config: ConfigService) => ({
		baseURL: config.getOrThrow('PUBLIC_NODE_BASE_URL')
	})
});
