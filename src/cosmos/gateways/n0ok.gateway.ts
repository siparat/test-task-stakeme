import { BadRequestException, Injectable } from '@nestjs/common';
import {
	N0okBlockResponseResult,
	N0okErrorResponse,
	N0okTransactionResponseResult
} from '../interfaces/n0ok-responses';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class N0okGateway {
	constructor(private httpService: HttpService) {}

	async getBlockByHeight(height: number): Promise<N0okBlockResponseResult> {
		const params = new URLSearchParams({ height: height.toString() });
		const response = await firstValueFrom(
			this.httpService.get<N0okBlockResponseResult | N0okErrorResponse>('block?' + params)
		);
		if ('code' in response.data) {
			throw new BadRequestException(response.data.data);
		}
		return response.data;
	}

	async getTransactionByHash(hash: string): Promise<N0okTransactionResponseResult> {
		const params = new URLSearchParams({ hash });
		const response = await firstValueFrom(
			this.httpService.get<N0okTransactionResponseResult | N0okErrorResponse>('tx?' + params)
		);
		if ('code' in response.data) {
			throw new BadRequestException(response.data.data);
		}
		return response.data;
	}
}
