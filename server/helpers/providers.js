export const providerLogin = (res, status, player) => {
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

export const handleProviders = (res, data, player) =>{
  if (player) {
      providerLogin(res, 200, player);
  } else {
      if (!data.email) {
          Player.create(data)
              .then(providerLogin.bind(this, res, 201))
              .catch(err => res.json(err));
      } else {
          Player.findOne({
                  email: data.email
              })
              .then(player => {
                  if (!player) {
                      Player.create(data)
                          .then(providerLogin.bind(this, res, 201))
                          .catch(err => res.json(err));
                  } else {
                      providerLogin(res, 200, player);
                  }
              })
              .catch(err => res.json(err))
      }
  }
};
