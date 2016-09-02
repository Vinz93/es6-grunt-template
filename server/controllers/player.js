import Player from '../models/player';

const PlayerController = {
  create(req, res, next) {
    Player.create(req.body)
    .then(player => res.status(201).json(player))
    .catch(next);
  },
};

export default PlayerController;
