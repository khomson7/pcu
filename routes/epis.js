var express = require('express');
const { checkToken } = require('../auth/jwt');
const { getEpi, getEpiDetail, getWbcvaccine, getEpi2, getEpivaccine } = require('../controllers/epi.controller');
var router = express.Router();

router.get('/',checkToken, getEpi );
router.get('/epidetail/:cid',checkToken, getEpiDetail );
router.get('/wbcvaccine',checkToken,getWbcvaccine );
router.get('/epi2',checkToken, getEpi2 );
router.get('/epivaccine',checkToken, getEpivaccine );
module.exports = router;