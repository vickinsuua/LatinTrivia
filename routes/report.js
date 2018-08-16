var express = require('express');
var router = express.Router();

const BalanceController = require('../controllers/reports');


router.post('/', BalanceController.create_balance);
router.get('/all',BalanceController.all_time);




module.exports = router;