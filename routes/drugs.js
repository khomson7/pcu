var express = require('express');
var router = express.Router();

const {
CreateDrugnew ,CreateSdrugnew 
} = require('../controllers/drug.controller');
const {
    checkToken
} = require('../auth/jwt');

router.post('/', CreateDrugnew);
router.post('/sdrug', CreateSdrugnew);
module.exports = router;