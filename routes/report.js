var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');

const BalanceController = require('../controllers/reports');


router.post('/',checkDevice,checkAuth, BalanceController.create_balance);
router.get('/all',checkDevice,checkAuth,BalanceController.all_time);




module.exports = router;