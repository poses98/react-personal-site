//Mongoose config
const mongoose = require('mongoose');
const app = require('./app');
const { API_VERSION, SERVER_IP, DB_PORT, SERVER_PORT } = require('./config');

// Realizamos la conexion a la bd con mongoose
mongoose.connect(
  `mongodb://${SERVER_IP}:${DB_PORT}/pablooses`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log('Connection to database succeded\n');
      app.listen(SERVER_PORT, () => {
        console.log(
          '\n\ndb         88888888ba   88      88888888ba   88888888888  ad88888ba  888888888888  '
        );
        console.log(
          'd88b        88      "8b  88      88      "8b  88          d8"     "8b      88       '
        );
        console.log(
          "d8'`8b       88      ,8P  88      88      ,8P  88          Y8,              88       "
        );
        console.log(
          "d8'  `8b      88aaaaaa8P'  88      88aaaaaa8P'  88aaaaa     `Y8aaaaa,        88       "
        );
        console.log(
          'd8YaaaaY8b     88""""""\'    88      88""""88\'    88"""""       `"""""8b,      88       '
        );
        console.log(
          'd8""""""""8b    88           88      88    `8b    88                  `8b      88       '
        );
        console.log(
          "d8'        `8b   88           88      88     `8b   88          Y8a     a8P      88       "
        );
        console.log(
          'd8\'          `8b  88           88      88      `8b  88888888888  "Y88888P"       88       \n\n'
        );
        console.log(`http://${SERVER_IP}:${SERVER_PORT}/api/${API_VERSION}`);
        console.log('\nWelcome back!');
      });
    }
  }
);
