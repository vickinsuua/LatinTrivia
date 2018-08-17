var mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: { type: String},
	prize: { type: Number }
});

module.exports = mongoose.model('Game', gameSchema);