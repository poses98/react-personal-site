const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creamos el modelo del usuario
const UserSchema = Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  active: Boolean,
  avatar: String,
});
//y lo exportamos
module.exports = mongoose.model("User", UserSchema);
