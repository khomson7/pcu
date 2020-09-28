var express = require('express');
var router = express.Router();

const {

    CreateOpdallergy,
    CreateCidencrypt
} = require('../controllers/person.controller');
const {
    checkToken
} = require('../auth/jwt');
router.post('/opdallergy', CreateOpdallergy);
router.post('/cidencrypt', CreateCidencrypt);
module.exports = router;