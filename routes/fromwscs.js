var express = require('express');
var router = express.Router();

const {
    checkToken
} = require('../auth/jwt');
const { CreatePpstopcu } = require('../controllers/fromwsc.controller');


router.post('/ppstohos', CreatePpstopcu);

module.exports = router;