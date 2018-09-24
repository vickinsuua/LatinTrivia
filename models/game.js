var mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: { type: Date},
	prize: { type: Number },
	status: {type: String}
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);