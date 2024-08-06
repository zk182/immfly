import { kCode, kErrorCode } from './symbols';
import HTTPError from './http';

/**
 * 	Bad Request Error
 */

export default class ConfigurationError extends HTTPError {
	[kErrorCode]: number;
	[kCode]: number;

	constructor(message = 'configuration error', customCode = 500) {
		super(message);
		this.name = 'ConfigurationError';
		this[kErrorCode] = customCode;
		this[kCode] = 500;
		Error.captureStackTrace(this, this.constructor);
	}
}
