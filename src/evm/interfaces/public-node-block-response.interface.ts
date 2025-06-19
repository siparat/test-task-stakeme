export interface PublicNodeBlockResponse {
	jsonrpc: '2.0';
	result: {
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
	};
	id: string;
}

export interface PublicNodeErrorResponse extends Pick<PublicNodeBlockResponse, 'id' | 'jsonrpc'> {
	error: {
		code: number;
		message: string;
	};
}
