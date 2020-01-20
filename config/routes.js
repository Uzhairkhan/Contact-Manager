const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../app/middlewares/authenticate");

const usersController = require("../app/controllers/UsersController");
const contactController = require("../app/controllers/contactsController");

router.post("/user/register", usersController.register);
router.post("/user/login", usersController.login);
router.get("/user/account", authenticateUser, usersController.account);
router.delete("/user/logout", authenticateUser, usersController.logout);

router.post("/contacts", authenticateUser, contactController.create);
router.get("/contacts/:id", authenticateUser, contactController.show);
router.put("/contacts/:id", authenticateUser, contactController.update);
router.get("/contacts", authenticateUser, contactController.list);

module.exports = {
  router
};
