import { kCode, kErrorCode } from './symbols';
import HTTPError from './http';

/**
 * 	Validation Error
 */

export default class ValidationError extends HTTPError {
	[kErrorCode]: number;
	[kCode]: number;

	constructor(message = 'Validation Error', customCode = 400) {
		super(message);
		this.name = 'ValidationError';
		this[kErrorCode] = customCode;
		this[kCode] = 400;
	}
}
