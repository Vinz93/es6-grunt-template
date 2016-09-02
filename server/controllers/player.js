import Promise from 'bluebird';
import Player from '../models/player';

const PlayerController = {
  create(req, res, next) {
    Player.create(req.body)
    .then(player =>{
      player.createSessionToken();
      player.save();
      res.status(201).json(player);
    })
    .catch(next);
  },

  facebook(req, res, next) {
    Player.findOne({
    facebookId: req.body.facebookId
    }).then(user => {
        if (!user){
          Player.create(req.body)
          .then(player =>{
            player.createSessionToken();
            res.status(201).json(player);
          })
          .catch(next);
        } else {
          user.createSessionToken();
          user.save();
          res.status(201).json(user)
        }
      })
  },

  twitter(req, res, next) {
    Player.findOne({
    twitterId: req.body.twitterId
    }).then(user => {
        if (!user){
          Player.create(req.body)
          .then(player =>{
            player.createSessionToken();
            res.status(201).json(player);
          })
          .catch(next);
        } else {
          user.createSessionToken();
          user.save();
          res.status(201).json(user)
        }
      })
  }
};

export default PlayerController;
