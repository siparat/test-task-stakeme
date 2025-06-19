import { randomUUID } from 'crypto';

interface Body {
	jsonrpc: '2.0';
	method: 'eth_getBlockByNumber';
	params: [height: string, false];
	id: string;
}

export class GetBlockByHeightBuilder {
	body: Body;

	constructor() {
		this.body = {
			jsonrpc: '2.0',
			method: 'eth_getBlockByNumber',
			params: ['', false],
			id: randomUUID()
		};
	}

	setHeight(height: number): this {
		this.body.params[0] = '0x' + height.toString(16);
		return this;
	}

	build(): Body {
		return this.body;
	}
}
