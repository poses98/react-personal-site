const jwt = require('../services/jwt/jwt');
const moment = require('moment');
const User = require('../models/user');

function hasTokenExpired(token) {
  const { expires } = token;
  const currentDate = moment().unix();

  if (currentDate > expires) {
    return true;
  }

  return false;
}

function refreshAccessToken(req, res) {
  //To refresh access token we need refresh token
  const { refreshToken } = req.body;
  const isTokenExpired = hasTokenExpired(refreshToken);

  if (isTokenExpired) {
    res.status(404).send({ message: 'Refresh token has expired' });
  } else {
    const { id } = jwt.decodeToken(refreshToken);

    User.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: 'Server error' });
      }
      if (!userStored) {
        res.status(404).send({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).send({
          accessToken: jwt.createAccessToken(userStored),
          refreshToken: refreshToken,
        });
      }
    });
  }
}

module.exports = {
  refreshAccessToken,
};
