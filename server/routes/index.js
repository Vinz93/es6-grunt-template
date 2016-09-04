import express from 'express';
import validate from 'express-validation';

//joi object with validations
import sessionValidator from '../../config/param_validations/session';
import playerValidator from '../../config/param_validations/player';
import userValidator from '../../config/param_validations/user';
import User from '../controllers/user';
import Player from '../controllers/player';
import Session from '../controllers/session';

validate.options({
  allowUnknownBody: false,
});

const router = express.Router();

router.route('/users')
.get(validate(userValidator.readAll), User.readAll);

router.route('/players')
.post(validate(playerValidator.create), Player.create);

router.route('/players/facebook')
.post(validate(playerValidator.facebook), Player.facebook);

router.route('/players/twitter')
.post(validate(playerValidator.twitter), Player.twitter);

router.route('/sessions')
  .post(validate(sessionValidator.create), Session.create)

// router.route('/sessions/validate')
//   .post(validate(sessionValidator.validate), Session.validate)

export default router;


/**
====== validation ======
|express-validation is a middleware that validates the body, params,
 query, headers and cookies of a request and returns a response with errors;
  if any of the configured validation rules fail.
 this middleware works with joi.


 ====== joi ======
 define validation rules for a request in a object.

*/
