import './config/index';

import logger from './libs/logger';
import app from './server/app';

const port = Number(process.env.PORT) || 3028;
app.listen(port, () => {
	logger.info(`server listening on port: ${port}`);
});
