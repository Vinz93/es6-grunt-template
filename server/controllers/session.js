/**
 * @author Vincenzo Bianco
 * @description Company controller definition
 * @lastModifiedBy Vincenzo Bianco
 */
 import Promise from 'bluebird';

 import User from '../models/user';
 import Player from '../models/player';


const SessionController = {
  create(req, res, next) {
    Player.findOne({ email: req.body.email })
    .then( user => {
      if(!user)
        return Promise.reject('not found 404');

      if(!user.authenticate(req.body.password))
        return Promise.reject('invalid password 404');

      user.createSessionToken();

      return user.save();
    })
    .then((user) => res.status(201).json({ token: user.sessionToken }))
    .catch(next);
  }
};

export default SessionController;
