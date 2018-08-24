const mongoose = require('mongoose');
const Question = require('../models/question');
const category = require('../models/category');

exports.questions_post_question =   (req, res, next) => {
	category.findOne({"_id":req.body.category}).exec().then( result => {
		if(result){
			const question = new Question({
				_id: new mongoose.Types.ObjectId(),
				question: req.body.question,
				correctAnswer: req.body.correctAnswer,
				optionB: req.body.optionB,
				optionC: req.body.optionC,
				category: result._id
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
				}
			});
			}).catch( err => {
				console.log(err);
				res.status(500).json({ error: err})
			});
		} else {
			console.log('category not found')
		}
	}).catch( err => {
		console.log(err);
		res.status(500).json({ error: err})
	});
	
};