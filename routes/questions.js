const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questions');

router.post('/', QuestionsController.questions_post_question);

module.exports = router;
