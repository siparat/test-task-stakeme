import { Expose } from 'class-transformer';

export class EvmBlockDto {
	@Expose()
	height: number;

	@Expose()
	hash: string;

	@Expose()
	parentHash: string;

	@Expose()
	gasLimit: string;

	@Expose()
	gasUsed: string;

	@Expose()
	size: string;
}
