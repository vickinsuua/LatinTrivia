var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');

const ReportController = require('../controllers/reports');


router.post('/',checkAuth, ReportController.create_balance);
router.get('/games/week',checkAuth, ReportController.games_week);
router.get('/friends/:id',checkAuth, ReportController.friends);
router.get('/all',checkAuth,ReportController.all_time);




module.exports = router;