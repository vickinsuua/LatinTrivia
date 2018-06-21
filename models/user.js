var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	nickname: {
		type: String,
		required: true
		// match: / [a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])? /
	},
	avatar: { type: String },
	verification: { 
		verify_code: { type: String},
		contry_code: { type: String, required: true},
		phone: { type: String, required: true},
		device_id: { type: String, required: true}
	}
});

module.exports = mongoose.model('User', userSchema);