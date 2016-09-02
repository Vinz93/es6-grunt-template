/**
 * @author Vicenzo Bianco
 * @description Company controller definition
 * @lastModifiedBy Vicenzo Bianco
 */

import { paginate } from '../helpers/utils';
import User from '../models/user';

const UserController = {
  readAll(req, res, next){
    const offset = paginate.offset(req.query.offset);
    const limit = paginate.limit(req.query.limit);

    const find = req.query.find || {};
    const sort = req.query.sort || { createdAt: 1 };

    User.paginate(find, {
      sort,
      offset,
      limit,
    })
    .then(users => res.json(users))
    .catch(next);
  }
};

export default UserController;
