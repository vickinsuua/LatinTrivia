var mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    description: { type: String},
    link: { type: String}
});

module.exports = mongoose.model('Setting', settingSchema);