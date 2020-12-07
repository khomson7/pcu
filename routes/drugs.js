var express = require('express');
var router = express.Router();

const {
CreateDrugnew, CreateDrugitemsrep
} = require('../controllers/drug.controller');
const {
    checkToken
} = require('../auth/jwt');

router.post('/', CreateDrugnew);
router.post('/drugitmesrep', CreateDrugitemsrep);
module.exports = router;