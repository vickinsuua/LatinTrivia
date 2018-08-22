var mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, //viene de otro modelo por ese el ref
	quantity: {type: Number, default: 1 } // el default es para que si no hay nada en quantity pase uno igual
},{
    versionKey: false
});

module.exports = mongoose.model('Order', orderSchema);