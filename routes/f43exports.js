var express = require('express');
var router = express.Router();

const {
    getWsEpi,
    getWsPerson,
    getWsAnc,
    CreateOpdallergy,
    getTest
} = require('../controllers/f43export.controller');
const {
    checkToken
} = require('../auth/jwt');

router.get('/epi', checkToken, getWsEpi);
router.get('/person', getWsPerson);
router.get('/anc', getWsAnc);
router.get('/test', getTest);
router.post('/opdallergy', CreateOpdallergy);
module.exports = router;