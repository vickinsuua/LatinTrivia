const mongoose = require('mongoose');
const Question = require('../models/question');

exports.questions_post_question =   (req, res, next) => {
	const question = new Question({
		_id: new mongoose.Types.ObjectId(),
		question: req.body.question,
		answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3
	});

	question.save().then( result => {
		console.log(result);
		res.status(201).json({
			message: 'questions created',
				createdquestion: {
					question: result.question,
                    answer1: result.answer1,
                    answer2: result.answer2,
                    answer3: result.answer3,
					_id: result._id
					// request: {
					// 	type: 'GET',
					// 	url: 'http://localhost:3000/questions/'+ result._id
					// }
		}
	});
	}).catch( err => {
		console.log(err);
		res.status(500).json({ error: err})
	});
};