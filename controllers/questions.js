const mongoose = require('mongoose');
const Question = require('../models/question');

exports.questions_post_question =   (req, res, next) => {
	const question = new Question({
		_id: new mongoose.Types.ObjectId(),
		question: req.body.question,
		correctAnswer: req.body.correctAnswer,
        optionB: req.body.optionB,
		optionC: req.body.optionC,
		category: req.body.category
	});

	question.save().then( result => {
		console.log(result);
		res.status(201).json({
			message: 'questions created',
				createdquestion: {
					question: result.question,
                    correctAnswer: result.correctAnswer,
                    optionB: result.optionB,
					optionC: result.optionC,
					category: result.category,
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