var mongoose = require('mongoose');

const categorySchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    description: {type: String, require:true}
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('category', categorySchema);