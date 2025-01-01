const express = require("express");
const router = express.Router();

const { register, login, check } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", authMiddleware, check);

module.exports = router;
