var express = require('express');
var router = express.Router();

const VerificationController = require('../controllers/verification');


router.post('/verification', VerificationController.verificationCode);



module.exports = router;