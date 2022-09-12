const express = require('express');
const MenuController = require('../controllers/menu');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

//POST endpoints
api.post('/add-menu', [md_auth.ensureAuth], MenuController.addMenu);
//GET endpoints
api.get('/get-menus', [md_auth.ensureAuth], MenuController.getMenus);
//PUT endpoints
//DELETE endpoints

module.exports = api;
