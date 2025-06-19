import { Expose } from 'class-transformer';

export class EvmBlockDto {
	@Expose()
	height: number;

	@Expose()
	hash: number;

	@Expose()
	parentHash: number;

	@Expose()
	gasLimit: number;

	@Expose()
	gasUsed: number;

	@Expose()
	size: number;
}
