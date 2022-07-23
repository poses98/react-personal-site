const jwt = require("jwt-simple");
const moment = require("moment");

//Key from jwt.js
const SECRET_KEY =
  "e9c9cb025d6ac1032012e2970fd5ab8750f51b2210ff0c395c65a1898a618607f5c3f744b06093e63a71aa55f53002be08e27fec2890342b9f2eb95e5fd6dd6b";

exports.ensureAuth = (req, res, next) => {
  //Checking if headers have auth..
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "La petición no tiene cabecera de autenticación." });
  }
  //Formatting the token..
  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    var payload = jwt.decode(token, SECRET_KEY);
    if (payload.exp <= moment.unix()) {
      //Token has expired
      return res.status(404).send({ message: "Token ha expirado." });
    } else {
    }
  } catch (e) {
    //console.log(e);
    return res.status(404).send({
      message: "Token no es válido. Registrando en los logs de seguridad.",
    });
  }

  req.user = payload;
  next();
};
