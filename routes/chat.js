var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');

const NLPController = require('../controllers/nlp');


router.post('/', checkAuth,NLPController.test);


module.exports = router;