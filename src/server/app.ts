import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// import errorHandler from './middlewares/errors.js';
import routes from './routes/index';

const app = express();

// Settings
app.use(cors({ credentials: true, origin: true }));

app.set('trust proxy', true);

app.use(cookieParser());

// Routes
app.use('/api', express.json({ limit: '50kb' }), routes);

// Error handler, must be called last
// app.use(errorHandler);

export default app;
