var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const balanceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    prize: {type: Number}
 
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Balance', balanceSchema);