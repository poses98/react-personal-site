const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();

//POST endpoints
api.post('/sign-up', UserController.signUp);
api.post('/sign-in', UserController.signIn);

//GET endpoints
api.get('/users',UserController.getUsers);

module.exports = api;
