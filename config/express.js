import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from './env/development';
import routes from '../server/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(config.path, routes);

export default app;
