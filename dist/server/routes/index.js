'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/users')
// .get(validate(userValidator.readAll), User.readAll);
.get(function (req, res) {
  console.log('route /user works');
  res.json("hey");
});

exports.default = router;
//# sourceMappingURL=index.js.map
