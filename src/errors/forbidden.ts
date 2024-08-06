import { kCode, kErrorCode } from './symbols';
import HTTPError from './http';

/**
 * 	Unauthorized Error
 */

export default class Forbidden extends HTTPError {
	[kErrorCode]: number;
	[kCode]: number;

	constructor(message = 'Forbidden', customCode = 403) {
		super(message);
		this.name = 'Forbidden';
		this[kErrorCode] = customCode;
		this[kCode] = 403;
	}
}
