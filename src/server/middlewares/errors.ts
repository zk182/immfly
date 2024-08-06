import { ValidationError } from 'express-validation';
import { Request, Response, NextFunction } from 'express';

import { kCode, kErrorCode } from '../../errors/symbols';
import { BadRequest, ResourceNotFound } from '../../errors/index';
import logger from '../../libs/logger';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) =>
	next(new ResourceNotFound());

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error(err);
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json({
			message: err.message,
			data: err.details
		});
	}

	if (err instanceof SyntaxError) {
		err = new BadRequest('Invalid JSON');
	}

	const message = err[kCode] ? err.message : 'Internal Server Error';
	const customCode = err[kErrorCode];
	const shouldShowStack = process.env.SHOW_API_ERROR_STACK === 'true';

	res.status(err[kCode] || 500).json({
		error: true,
		message,
		errorCode: customCode,
		data: err.data,
		stack: shouldShowStack ? err.stack : undefined
	});
};

export default [notFoundHandler, errorHandler];
