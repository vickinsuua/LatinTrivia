var mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String},
	notification: { type: String},
	type: { type: String},
    time: { type: Date},
    is_read: { type: Boolean}

},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);