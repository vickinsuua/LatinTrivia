var mongoose = require('mongoose');

const verificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phone: {type: mongoose.Schema.Types.String, ref: 'User', required: true }, //viene de otro modelo por ese el ref
    contry_code: {type: mongoose.Schema.Types.String, ref: 'User', required: true }, 
    verify_code: { type: String},
    verified: { type: String },
    device_id: { type: String, required: true}
});

module.exports = mongoose.model('Verification', verificationSchema);