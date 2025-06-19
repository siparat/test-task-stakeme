export class CosmosTransactionDto {
	hash: string;
	height: string;
	time: Date;
	gasUsed: string;
	gasWanted: string;
	fee: string;
	sender: string | null;
}
