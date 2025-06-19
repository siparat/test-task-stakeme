import { randomUUID } from 'crypto';

interface Body {
	jsonrpc: '2.0';
	method: 'eth_getTransactionByHash';
	params: [hash: string];
	id: string;
}

export class GetTransactionByHashBuilder {
	body: Body;

	constructor() {
		this.body = {
			jsonrpc: '2.0',
			method: 'eth_getTransactionByHash',
			params: [''],
			id: randomUUID()
		};
	}

	setHash(hash: string): this {
		this.body.params[0] = hash;
		return this;
	}

	build(): Body {
		return this.body;
	}
}
