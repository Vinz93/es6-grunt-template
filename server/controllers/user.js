/**
 * @author Vicenzo Bianco
 * @description Company controller definition
 * @lastModifiedBy Vicenzo Bianco
 */
import path from 'path';
import templates from 'email-templates';
import Promise from 'bluebird';

import {
    paginate
} from '../helpers/utils';
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
                    return res.status(404).json({
                        msg: "use not found"
                    });
                const config = req.app.locals.config;
                const template = path.join(config.root, '/server/views/mail/password_recovery');
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
    },

    verificationToken(req, res, next) {
        Player.findOne({
                email: req.body.email,
            }).then(player => {
                if (!player)
                    return res.status(404).json({
                        msg: "use not found"
                    });

                const config = req.app.locals.config;
                const template = path.join(config.root, '/server/views/mail/mail_verification');
                const send = req.app.locals.transporter.templateSender(new EmailTemplate(template));
                player.createVerificationToken();
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

    checkVerificationToken(req, res, next) {
        const expiredTime = req.app.locals.config.expiredTime;
        Player.findOne({
                email: req.body.email
            })
            .then(player => {
                if (!player)
                    return Promise.reject("user no found!!");

                if (!(player.verificationToken == req.body.verificationToken) || player.expiredVerification(expiredTime))
                    return Promise.reject("Invalid Token!");

                console.log("-----se supone quye es legal!");
                player.verificationToken = undefined;
                player.verified = true;
                player.createSessionToken();
                return player.save();
            })
            .then(player => {
                res.status(200).json(player);
            })
            .catch(err => res.status(400).json({
                error: err
            }));
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

==========================================================
                          MAILER
===========================================================
using nodemailer.

====================== 1 settings (mail account) =========================
with this mailer object you can define or authtenticate your mailer account.

transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'techludopia@gmail.com',
        pass: '12ludotech34',
    },
}
====================== 2 create the transporter  =============================
var transporter = nodemailer.createTransport(transport[, defaults])
Where
  -transporter is going to be an object that is able to send mail
  -transport is the transport configuration object, connection url or
   a transport plugin instance.
  -defaults is an object that defines default values for mail options

transporter = nodemailer.createTransport(transport);

================= 3 Template configuration ==================================
import templates from 'email-templates';

const EmailTemplate = templates.EmailTemplate;

 //== se define la ruta en donde se aloja el template ==.
 // nota: el template debe tener el nombre html.ejs y se debe tener el modulo
 // de ejs, la ruta solo apunta a la carpeta donde se encuentra el archivo ejs..

const template = path.join(config.root, '/server/views/mail/password_recovery');


================= 4 Template configuration ==================================

Nodemailer allows to use simple built-in templating or alternatively external
 renderers for common message types.

var send = transporter.templateSender(new EmailTemplate('template/directory'));

templates is an object with template strings for built-in renderer
or an EmailTemplate object for more complex rendering

-the execute the send function.

send(mailData, context).then(...).catch(...);



*/
