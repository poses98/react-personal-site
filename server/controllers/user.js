const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt/jwt");
const User = require("../models/user");

/**
 * Function to signUp users
 * @param {*} req
 * @param {*} res
 */
function signUp(req, res) {
  const user = new User();

  const { name, lastName, email, password, repeatPassword } = req.body;

  user.name = name;
  user.lastName = lastName;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res
        .status(404)
        .send({ message: "Las contraseñas tienen que coincidir." });
    } else {
      //Encriptamos la contraseña
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res.status(500).send({ message: "Error al encriptar" });
        } else {
          user.password = hash;
          //Se guarda el usuario en la base de datos
          user.save((err, storedUser) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe" });
            } else {
              if (!storedUser) {
                res.status(404).send({ message: "Error al crear el usuario" });
              } else {
                res.status(200).send({ user: storedUser });
              }
            }
          });
        }
      });
    }
  }
}

/**
 * Function to signIn users
 * @param {*} req
 * @param {*} res
 */
function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, storedUser) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!storedUser) {
        res
          .status(404)
          .send({ message: "El usuario o la contraseña no existen" });
      } else {
        bcrypt.compare(password, storedUser.password, (err, valid) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor" });
          } else if (!valid) {
            res
              .status(404)
              .send({ message: "El usuario o la contraseña no existen" });
          } else {
            if (!storedUser.active) {
              res.status(200).send({
                code: 200,
                message: "La cuenta no está activada",
              });
            } else {
              //Password ok & active ok -> create access token
              res.status(200).send({
                accessToken: jwt.createAccessToken(storedUser),
                refreshToken: jwt.createRefreshToken(storedUser),
              });
            }
          }
        });
      }
    }
  });
}

function getUsers(req, res) {
  User.find()
    .select("-password") //Excluding password field
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningún usuario." });
      } else {
        res.status(200).send({ users });
      }
    });
}

function getUsersActive(req, res) {
  const query = req.query;
  User.find({ active: query.active })
    .select("-password")
    .then((users) => {
      if (!users) {
        res.status(404).send({
          message: "No se han encontrado usuarios con la cuenta activada.",
        });
      } else {
        res.status(200).send({ users });
      }
    });
}

function uploadAvatar(req, res) {
  // Getting user id...
  const params = req.params;
  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!userData) {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else {
        let user = userData;

        if (req.files) {
          let filePath = req.files.avatar.path; // uploads/avatar/Ihh6alx4SAiJ046r9YSbhmbl.png
          let fileSplit = filePath.split("/"); // [uploads,avatar,Ihh6alx4SAiJ046r9YSbhmbl.png]
          let fileName = fileSplit[2]; // Ihh6alx4SAiJ046r9YSbhmbl.png
          let fileExt = fileName.split(".")[1]; // png

          if (!/(jpe?g|tiff?|png|webp|bmp)$/i.test(fileExt)) {
            res.status(400).send({
              message:
                "Extensión de archivo no válida. (Se permiten png,jpg,tiff,png,webp y bmp)",
            });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor" });
                } else {
                  if (!userResult) {
                    res.status(404).send({ message: "Usuario no encontrado" });
                  } else {
                    res.status(200).send({ avatarName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function getAvatar(req, res) {
  //Get filename
  const avatarName = req.params.avatarName;
  const filePath = `./uploads/avatar/${avatarName}`;

  fs.access(filePath, (error) => {
    if (error) {
      res
        .status(404)
        .send({ message: `Imagen no encontrada ${error.message}` });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

function updateUser(req, res) {
  const userData = req.body;
  const params = req.params;

  User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userUpdate) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        res.status(200).send({ message: "Usuario actualizado correctamente." });
      }
    }
  });
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
};
