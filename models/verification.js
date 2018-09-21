var mongoose = require('mongoose');

const verificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    verify_code: { type: String},
    moment_unix: {type: Number},
    token: {type: String},
    verified: { type: Boolean },
    Facebook: {type: Boolean},
    device_id: { type: String, required: true}
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Verification', verificationSchema);