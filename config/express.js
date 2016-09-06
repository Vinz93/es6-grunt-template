import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import nodemailer from 'nodemailer';

import config from './env/development';
import routes from '../server/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(config.path, routes);

app.locals.transporter = nodemailer.createTransport(config.mailer);


export default app;
