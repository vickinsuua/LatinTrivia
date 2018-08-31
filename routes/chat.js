var express = require('express');
var router = express.Router();

const NLPController = require('../controllers/nlp');


router.post('/', NLPController.test);


module.exports = router;