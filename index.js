import express from 'express';
import bodyParser from 'body-parser';

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
}

connect()
  .once('open',listen);
//a
