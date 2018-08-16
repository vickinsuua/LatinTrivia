var express = require('express');
var router = express.Router();

const VerificationController = require('../controllers/verification');


router.post('/', VerificationController.verificationCode);

router.patch('/code/:device_id', VerificationController.verification);



module.exports = router;