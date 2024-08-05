import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<any>;

export const asyncHandler =
	(fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
