export interface N0okBlockResponseResult {
	block_id: {
		hash: string;
		parts: {
			total: number;
			hash: string;
		};
	};
	block?: {
		header: {
			version: {
				block: string;
				app: string;
			};
			chain_id: string;
			height: string;
			time: string;
			last_block_id: {
				hash: string;
				parts: {
					total: number;
					hash: string;
				};
			};
			last_commit_hash: string;
			data_hash: string;
			validators_hash: string;
			next_validators_hash: string;
			consensus_hash: string;
			app_hash: string;
			last_results_hash: string;
			evidence_hash: string;
			proposer_address: string;
		};
		data: {
			txs: string[];
		};
		last_commit: {
			height: string;
			round: number;
			block_id: {
				hash: string;
				parts: {
					total: number;
					hash: string;
				};
			};
			signatures: {
				block_id_flag: number;
				validator_address: string;
				timestamp: string;
				signature: string;
			}[];
		};
	};
}

export interface N0okTransactionResponseResult {
	hash: string;
	height: string;
	index: number;
	tx_result: {
		data: string;
		log: string;
		gas_wanted: string;
		gas_used: string;
		evm_tx_info: {
			senderAddress: string;
			txHash: string;
		};
		events: {
			type: 'tx' | 'message' | 'signer' | 'aggregate_vote';
			attributes: {
				key: string;
				value: string | null;
				index: boolean;
			}[];
		}[];
	};
	tx: string;
}

export interface N0okErrorResponse {
	code: number;
	message: string;
	data: string;
}
