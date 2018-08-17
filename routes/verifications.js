var express = require('express');
var router = express.Router();

const VerificationController = require('../controllers/verification');


router.post('/', VerificationController.verification);

router.patch('/code/:device_id', VerificationController.verification_code);



module.exports = router;