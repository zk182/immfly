import { kCode, kErrorCode } from './symbols';
import HTTPError from './http';

/**
 * 	ResourceNotFound Error
 */

export default class ResourceNotFound extends HTTPError {
	[kErrorCode]: number;
	[kCode]: number;

	constructor(message = 'Not found', customCode = 404) {
		super(message);
		this.name = 'ResourceNotFound';
		this[kErrorCode] = customCode;
		this[kCode] = 404;
	}
}
