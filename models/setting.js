var mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    description: { type: String},
    link: { type: String},
    type: { type: String}
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);