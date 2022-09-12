const Menu = require('../models/menu');

function addMenu(req, res) {
  const menu = new Menu();

  const { title, url, order, active } = req.body;
  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;

  menu.save((err, storedMenu) => {
    if (err) {
      res.status(500).send({ message: 'Error del servidor.' });
    } else {
      if (!storedMenu) {
        res.status(404).send({ message: 'Eror al crear el menú' });
      } else {
        res.status(200).send({ message: 'Menú creado con éxito' });
      }
    }
  });
}

function getMenus(req, res) {
  Menu.find()
    .sort({ order: 'asc' })
    .then((menus) => {
      if (!menus) {
        res.status(404).send({ message: 'No se han encontrado menús' });
      } else {
        res.status(200).send({ menus });
      }
    });
}

module.exports = {
  addMenu,
  getMenus,
};
