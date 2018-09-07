var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	nickname: { type: String},
	avatar: { type: String},
	contry_code: { type: String},
	phone: { type: String},
	share_code: { type: String},
	referral_code: { type: String},
	extra_life: { type: Number},
	balance: { type: Number }

},{
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);