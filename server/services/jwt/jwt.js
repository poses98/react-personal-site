//Importamos jwt para el tema de tokens y moment para fechas
const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET_KEY =
  'e9c9cb025d6ac1032012e2970fd5ab8750f51b2210ff0c395c65a1898a618607f5c3f744b06093e63a71aa55f53002be08e27fec2890342b9f2eb95e5fd6dd6b';

/**
 * Function which creates an access token with 3h of validity
 * @param {*} user
 */
exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastName: user.name,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    expires: moment().add(3, 'hours').unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = function (user) {
  const payload = {
    id: user.id,
    expires: moment().add(30, 'days').unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.decodeToken = function (token) {
  return jwt.decode(token, SECRET_KEY, true);
};
