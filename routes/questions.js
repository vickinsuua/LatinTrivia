const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questions');
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');
const { check, validationResult } = require('express-validator/check');

router.post('/',checkDevice,checkAuth,[check('question').exists().isString(),check('correctAnswer').exists().isString(),check('optionB').exists().isString(),check('optionC').exists().isString(),check('category').exists()], QuestionsController.questions_post_question);

module.exports = router;
