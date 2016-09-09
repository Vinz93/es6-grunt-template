import mongoose from 'mongoose';
import Promise from 'bluebird';

import config from './config/env/development';
import app from './config/express';

mongoose.Promise = Promise;

function listen() {
  app.listen(config.port,
     () => console.log(`app is listening on port ${config.port} !`));
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
