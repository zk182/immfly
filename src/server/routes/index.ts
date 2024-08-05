import express from 'express';

import HealthRouter from './health';
import ExerciseRouter from './exercise';

const router = express.Router();

router.use('/health', HealthRouter);
router.use('/exercise', ExerciseRouter);

export default router;
