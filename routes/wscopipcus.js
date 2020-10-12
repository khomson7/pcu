var express = require('express');
var router = express.Router();

const {
    getWsopipcu
} = require('../controllers/opitemrece.controller');
const {
    checkToken
} = require('../auth/jwt');
router.get('/wsopipcu', getWsopipcu);

module.exports = router;