import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/env/development';

const app = express();

app.use(bodyParser.json());

function listen() {
  app.listen(config.port,
     () => console.log(`app is listening on port ${config.port}`));
}

function connect() {
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1,
      },
    }
  };

return mongoose.connect(config.db,options).connection;
}

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open',listen);
