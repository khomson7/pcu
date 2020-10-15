var express = require('express');
var router = express.Router();

const {
    getWsEpi,
    getWsPerson,
    getWsAnc,
    CreateOpdallergy,
    getTest,
    getWsepis
} = require('../controllers/f43export.controller');
const {
    checkToken
} = require('../auth/jwt');

router.get('/epi', checkToken, getWsEpi);
router.get('/person',checkToken, getWsPerson);
router.get('/anc',checkToken, getWsAnc);
router.get('/test', getTest);
router.post('/opdallergy',checkToken, CreateOpdallergy);
router.get('/epis',  getWsepis);
module.exports = router;