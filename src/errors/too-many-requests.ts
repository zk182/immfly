import { kCode, kErrorCode } from './symbols';
import HTTPError from './http';

/**
 * 	ToManyRequests Error
 */

export default class TooManyRequests extends HTTPError {
	[kErrorCode]: number;
	[kCode]: number;

	constructor(message = 'To many requests', customCode = 429) {
		super(message);
		this.name = 'TooManyRequests';
		this[kErrorCode] = customCode;
		this[kCode] = 429;
	}
}
