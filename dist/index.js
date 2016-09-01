'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

function listen() {
  app.listen(3000, function () {
    console.log("app its listening on port 3000");
  });
}

function connect() {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
}

connect().once('open', listen);
//a
//# sourceMappingURL=index.js.map
