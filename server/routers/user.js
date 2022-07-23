const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticated");

const api = express.Router();

//POST endpoints
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);

//GET endpoints
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);

module.exports = api;
