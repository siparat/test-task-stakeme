interface PublicNodeResponse<T extends object> {
	jsonrpc: '2.0';
	id: string;
	result: T;
}

interface PublicNodeBlockResponseResult {
	baseFeePerGas: string;
	difficulty: string;
	extraData: string;
	gasLimit: string;
	gasUsed: string;
	hash: string;
	logsBloom: string;
	miner: string;
	mixHash: string;
	nonce: string;
	number: string;
	parentHash: string;
	receiptsRoot: string;
	sha3Uncles: string;
	size: string;
	stateRoot: string;
	timestamp: string;
	transactions: string[];
	transactionsRoot: string;
	uncles: string[];
}

export type PublicNodeBlockResponse = PublicNodeResponse<PublicNodeBlockResponseResult>;

export interface PublicNodeTransactionResponseResult {
	blockHash: string;
	blockNumber: string;
	from: string;
	gas: string;
	gasPrice: string;
	hash: string;
	input: string;
	nonce: string;
	to: string;
	transactionIndex: string;
	value: string;
	type: '0x0' | '0x2';
	v: string;
	r: string;
	s: string;
	maxFeePerGas?: string;
	maxPriorityFeePerGas?: string;
}

export type PublicNodeTransactionResponse = PublicNodeResponse<PublicNodeTransactionResponseResult>;

export interface PublicNodeErrorResponse extends Pick<PublicNodeBlockResponse, 'id' | 'jsonrpc'> {
	error: {
		code: number;
		message: string;
	};
}
