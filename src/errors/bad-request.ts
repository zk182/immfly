import { kCode, kErrorCode } from './symbols';
import HTTPError from './http';

/**
 * 	Bad Request Error
 */

export default class BadRequestError extends HTTPError {
	[kErrorCode]: number;
	[kCode]: number;

	constructor(message = 'bad request', customCode = 400) {
		super(message);
		this.name = 'BadRequestError';
		this[kErrorCode] = customCode;
		this[kCode] = 400;
	}
}
