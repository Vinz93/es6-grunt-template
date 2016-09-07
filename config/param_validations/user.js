import objectId from 'joi-objectid';
import Joi from 'joi';

Joi.objectId = objectId(Joi);
export default {
  readAll: {
    query: {
      offset: Joi.number().integer(),
      limit: Joi.number().integer(),
    }
  },
  recoveryToken:{
    body:{
      email: Joi.string().email().required(),
    }
  },
  vericationToken:{
    body:{
      email: Joi.string().email().required(),
    }
  }
}
