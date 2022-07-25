const express = require("express");
const UserController = require("../controllers/user");
const multipart = require("connect-multiparty");

const md_auth = require("../middleware/authenticated");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });

const api = express.Router();

//POST endpoints
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);

//GET endpoints
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);
api.get("/get-avatar/:avatarName", UserController.getAvatar); //Endpoint not protected as no sensible information. Just pictures that are public.
//PUT endpoints
//For file uploading we use connect multiparty middleware
api.put(
  "/upload-avatar/:id",
  [md_auth.ensureAuth, md_upload_avatar],
  UserController.uploadAvatar
);

module.exports = api;
