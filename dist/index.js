'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _development = require('./config/env/development');

var _development2 = _interopRequireDefault(_development);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

function listen() {
  app.listen(_development2.default.port, function () {
    return console.log('app is listening on port ' + _development2.default.port);
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

  return _mongoose2.default.connect(_development2.default.db, options).connection;
}

connect().on('error', console.log).on('disconnected', connect).once('open', listen);
//# sourceMappingURL=index.js.map
