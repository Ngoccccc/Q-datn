const express = require("express");

const {
  login,
  logout,
  signup,
  editProfile,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);


module.exports = router;
