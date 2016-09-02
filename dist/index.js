'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _development = require('./config/env/development');

var _development2 = _interopRequireDefault(_development);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listen() {
  _express2.default.listen(_development2.default.port, function () {
    return console.log('app is listening on port ' + _development2.default.port + ' !');
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
