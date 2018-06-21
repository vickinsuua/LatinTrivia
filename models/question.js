var mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	question: {type: String, required: true },
	answer1: {type: String, required: true },
    answer2: {type: String, required: true },
    answer3: {type: String, required: true }
});

module.exports = mongoose.model('Question', questionSchema);