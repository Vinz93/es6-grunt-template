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
    const select = { password: 0 , sessionToken: 0, twitterId: 0, facebookId: 0};

    User.paginate(find, {
      sort,
      offset,
      limit,
      select,
    })
    .then(users => res.json(users))
    .catch(next);
  }
};

export default UserController;

/**
the controller is exported with all of his functions.

===== paginate ======

its a mongoose plugins, that allows to paginate in a collection, returns an
a array with this structure:

{
  "docs": [
    {
      ..
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}


*/
