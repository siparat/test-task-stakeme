import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PublicNodeBlockResponse, PublicNodeErrorResponse } from '../interfaces/public-node-block-response.interface';
import { GetBlockByHeightBuilder } from './builders/get-block-by-height.builder';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PublicNodeGateway {
	constructor(private httpService: HttpService) {}

	async getBlockByHeight(height: number): Promise<PublicNodeBlockResponse> {
		const bodyBuilder = new GetBlockByHeightBuilder();
		const body = bodyBuilder.setHeight(height).build();
		const response = await firstValueFrom(
			this.httpService.post<PublicNodeBlockResponse | PublicNodeErrorResponse>('', body)
		);
		if ('error' in response.data) {
			throw new BadRequestException(response.data.error.message);
		}
		return response.data;
	}
}
