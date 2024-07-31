const express = require('express');
const {
  login,
  register,
  getUserDetails,
  allUsers,
  oneUser,
} = require("../controller/userController");
const isLoggedin = require('../middlewares/isLoggedin');
const router =express.Router();


router.route('/login').post(login);
router.route('/register').post(register);
router.route('/userdetails').post(isLoggedin,getUserDetails)
router.route('/allusers').get(allUsers);

router.route("/oneuser").post(oneUser);

module.exports =router;