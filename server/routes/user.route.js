const express = require('express');
const router = express.Router();

const userController = require("../controllers/user.controller")

router.post("/session",userController.login);
router.delete("/session",userController.logout);

router.post("",userController.CreateUser);
router.get("",userController.getUser);
router.get("/:id",userController.getUserById);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);






router.get("/cookie",userController.cookie);

module.exports = router;