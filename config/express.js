import express from 'express';
import bodyParser from 'body-parser';

import config from './env/development';
import routes from '../server/routes';

const app = express();

app.use(bodyParser.json());

app.use(config.path, routes);

export default app;
