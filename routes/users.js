var express = require('express');
var router = express.Router();
const {
  createUser,
  getUsers,
  getUserByUserId,
  updateUsers,
  login,
  getDateProcess,
  createDateProcess

} = require("../controllers/user.controller");
const {
  checkToken
} = require("../auth/jwt");
const {
  CreateDateProcess
} = require('../services/user.service');

/* GET users listing. */
/*
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
}); */

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/dateprocess", getDateProcess);
router.post("/dateprocess", createDateProcess);
router.patch("/", checkToken, updateUsers);
router.post("/login", login);
router.get("/:id/:username", checkToken, getUserByUserId);

module.exports = router;