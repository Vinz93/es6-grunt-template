import Promise from 'bluebird';
import path from 'path';
import templates from 'email-templates';

import Player from '../models/player';
import config from '../../config/env/development';

const EmailTemplate = templates.EmailTemplate;
const createAndLogin = (res, status, player) => {
    if (player.verified == false)
        player.verified = true;
    if (player.verificationToken)
        player.verificationToken = undefined;

    player.createSessionToken();
    player.save()
        .then(player => {
            res.status(status).json(player);
        })
        .catch(err => res.json(err));
};


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
                        .then(player => res.status(201).json(player))
                        .catch(next);
                });
            })
            .catch(err => res.status(400).json(err));
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
    },

    facebookV2(req, res, next) {
        let data = req.body;
        Player.findOne({
                facebookId: data.facebookId
            })
            .then(player => {
                if (player) {
                    createAndLogin(res, 200, player);
                } else {
                    if (!data.email) {
                        Player.create(data)
                            .then(createAndLogin.bind(this, res, 201))
                            .catch(err => res.json(err));
                    } else {
                        Player.findOne({
                                email: data.email
                            })
                            .then(player => {
                                if (!player) {
                                    Player.create(data)
                                        .then(createAndLogin.bind(this, res, 201))
                                        .catch(err => res.json(err));
                                } else {
                                    createAndLogin(res, 200, player);
                                }
                            })
                            .catch(err => res.json(err))

                    }
                }
            })
            .catch(err => res.json(err));
    }
};

export default PlayerController;
