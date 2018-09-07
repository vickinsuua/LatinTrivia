var express = require('express');
var router = express.Router();
const checkDevice = require('../middleware/check-device');
const checkAuth = require('../middleware/check-auth');
const { check, validationResult } = require('express-validator/check');

const VerificationController = require('../controllers/verification');


router.post('/',checkAuth,VerificationController.verification);
router.patch('/code/:device_id',[check('verify_code').exists().isString()], VerificationController.verification_code);

module.exports = router;