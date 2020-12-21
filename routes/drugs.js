var express = require('express');
var router = express.Router();

const {
CreateDrugnew ,CreateSdrugnew 
} = require('../controllers/drug.controller');
const {
    checkToken
} = require('../auth/jwt');

router.post('/',checkToken, CreateDrugnew);
router.post('/sdrug',checkToken, CreateSdrugnew);
module.exports = router;