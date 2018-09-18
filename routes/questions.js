const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questions');
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');
const { check, validationResult } = require('express-validator/check');

router.post('/',checkAuth, QuestionsController.questions_post_question);

module.exports = router;
