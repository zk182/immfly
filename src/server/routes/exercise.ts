import express, { Request, Response } from 'express';
import { validate } from 'express-validation';

import ExerciseController from '../../controllers/exercise';

import { asyncHandler } from '../middlewares/utils';
import { orderType } from '#src/models/exercise';

const ExerciseRouter = express.Router();

ExerciseRouter.get(
	'/countries',
	asyncHandler(async (req: Request, res: Response) => {
		const filter = req.query.filter as string;
		const order = req.query.order as orderType;

		const data = await ExerciseController.getData(filter, order);

		res.json(data);
	})
);

ExerciseRouter.get(
	'/reverse/:word',
	asyncHandler(async (req: Request, res: Response) => {
		res.json(ExerciseController.reverse(req.params.word));
	})
);

ExerciseRouter.get(
	'/append',
	asyncHandler(async (req: Request, res: Response) => {
		const start = req.query.start as string;
		const end = req.query.end as string;

		const result = ExerciseController.append(start, end);

		res.json(result);
	})
);

export default ExerciseRouter;
