import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/env';

const app = express();

app.use(bodyParser.json());

function listen() {
  app.listen(3000, function () {
    console.log("app its listening on port 3000");
  });
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
