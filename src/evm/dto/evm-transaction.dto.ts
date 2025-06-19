import { Expose, Transform } from 'class-transformer';

export class EvmTransactionDto {
	@Expose()
	hash: string;

	@Expose()
	to: string;

	@Expose()
	from: string;

	@Expose()
	value: string;

	@Expose()
	input: string;

	@Transform(({ value }) => value || null)
	@Expose()
	maxFeePerGas: string;

	@Transform(({ value }) => value || null)
	@Expose()
	maxPriotityFeePerGas: string;

	@Expose()
	gasPrice: string;
}
