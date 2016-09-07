/**
 * @author Vicenzo Bianco
 * @description Company controller definition
 * @lastModifiedBy Vicenzo Bianco
 */
import path from 'path';
import templates from 'email-templates';

import { paginate } from '../helpers/utils';
import User from '../models/user';
import Player from '../models/player';

const EmailTemplate = templates.EmailTemplate;

const UserController = {
    readAll(req, res, next) {
        const offset = paginate.offset(req.query.offset);
        const limit = paginate.limit(req.query.limit);

        const find = req.query.find || {};
        const sort = req.query.sort || {
            createdAt: 1
        };
        const select = {
            password: 0,
            sessionToken: 0,
            twitterId: 0,
            facebookId: 0
        };

        User.paginate(find, {
                sort,
                offset,
                limit,
                select,
            })
            .then(users => res.json(users))
            .catch(next);
    },

    recoveryToken(req, res, next) {
        Player.findOne({
                email: req.body.email,
            }).then(player => {
                if (!player)
                    return res.status(404).json({ msg: "use not found"});
                const config = req.app.locals.config;
                const template = path.join(config.root, '/server/views/mail/password_recovery');
                console.log("template route :", template);
                const send = req.app.locals.transporter.templateSender(new EmailTemplate(template));
                player.createRecoveryToken();
                send({
                    to: player.email,
                    subject: 'Password recovery',
                }, {
                    player,
                }, err => {
                    if (err)
                        return next(err);

                    player.save()
                        .then(() => res.status(201).end())
                        .catch(next);
                });
            })
            .catch(err => res.json(err));
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
