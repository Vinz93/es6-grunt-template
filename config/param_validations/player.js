import Joi from 'joi';

export default {
    create: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().required(),
            bornAt: Joi.string().isoDate().required(),
        },
    },
    facebook: {
        body: {
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().required(),
            bornAt: Joi.string().isoDate().required(),
            facebookId: Joi.string().required(),
        }
    },
    twitter: {
        body: {
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().required(),
            bornAt: Joi.string().isoDate().required(),
            twitterId: Joi.string().required(),
        }
    },
    facebookV2: {
        body: {
            email: Joi.string().email(),
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            gender: Joi.string(),
            bornAt: Joi.string().isoDate(),
            facebookId: Joi.string().required(),
        }
    },

};
