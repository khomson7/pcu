var express = require('express');
const { checkToken } = require('../auth/jwt');
const { getChospitalAmp } = require('../controllers/towsc.controller');

var router = express.Router();


router.get('/chospitalamp', checkToken ,getChospitalAmp );

module.exports = router;