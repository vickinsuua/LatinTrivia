var mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	question: {type: String, required: true },
	correctAnswer: {type: String, required: true },
    optionB: {type: String, required: true },
	optionC: {type: String, required: true },
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);