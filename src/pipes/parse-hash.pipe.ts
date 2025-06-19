import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseHashPipe implements PipeTransform {
	transform(value: string): string {
		const isValid = /^0x([0-9a-f]{64})$/i.test(value);
		if (!isValid) {
			throw new BadRequestException('Invalid hash format');
		}
		return value;
	}
}
