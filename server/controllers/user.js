const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

function signUp(req, res) {
  const user = new User();

  const { name, lastName, email, password, repeatPassword } = req.body;

  user.name = name;
  user.lastName = lastName;
  user.email = email.toLowerCase();
  user.role = 'admin';
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: 'Las contraseñas son obligatorias' });
  } else {
    if (password !== repeatPassword) {
      res
        .status(404)
        .send({ message: 'Las contraseñas tienen que coincidir.' });
    } else {
      //Encriptamos la contraseña
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res.status(500).send({ message: 'Error al encriptar' });
        } else {
          user.password = hash;
          //Se guarda el usuario en la base de datos
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: 'El usuario ya existe' });
            } else {
              if (!userStored) {
                res.status(404).send({ message: 'Error al crear el usuario' });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}

module.exports = {
  signUp,
};
