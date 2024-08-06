import { kCode, kErrorCode } from './symbols';
import HTTPError from './http';

/**
 * 	Conflict Request Error
 */

export default class ConflictError extends HTTPError {
	[kErrorCode]: number;
	[kCode]: number;

	constructor(message = 'conflict', customCode = 409) {
		super(message);
		this.name = 'ConflictError';
		this[kErrorCode] = customCode;
		this[kCode] = 409;
	}
}
