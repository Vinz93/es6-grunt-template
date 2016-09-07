import Promise from 'bluebird';
import path from 'path';
import templates from 'email-templates';

import Player from '../models/player';
import config from '../../config/env/development';

const EmailTemplate = templates.EmailTemplate;


const PlayerController = {
    create(req, res, next) {
        Player.create(req.body)
            .then(player => {
                  player.createVerificationToken();
                  const template = path.join(config.root, '/server/views/mail/mail_verification');
                  const send = req.app.locals.transporter.templateSender(new EmailTemplate(template));
                send({
                    to: player.email,
                    subject: 'Tap and Win Verification',
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
    },



    facebook(req, res, next) {
        Player.findOne({
                facebookId: req.body.facebookId
            }).then(user => {
                if (!user) {
                    let data = req.body;
                    data.verified = true;
                    Player.create(data)
                        .then(player => {
                            player.createSessionToken();
                            res.status(201).json(player);
                        })
                        .catch(err => res.json(err));
                } else {
                    user.createSessionToken();
                    user.save();
                    res.status(201).json(user)
                }
            })
            .catch(err => res.json(err));
    },
    twitter(req, res, next) {
        Player.findOne({
                twitterId: req.body.twitterId
            }).then(user => {
                if (!user) {
                  let data = req.body;
                  data.verified = true;
                    Player.create(data)
                        .then(player => {
                            player.createSessionToken();
                            player.save();
                            res.status(201).json(player);
                        })
                        .catch(err => res.json(err));
                } else {
                    user.createSessionToken();
                    user.save();
                    res.status(200).json(user)
                }
            })
            .catch(err => res.json(err));
    }
};

export default PlayerController;
