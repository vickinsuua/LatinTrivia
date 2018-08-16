const mongoose = require('mongoose');
const Balance = require('../models/balance');

exports.create_balance = (req, res, next) => {
    const balance = new Balance({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        game: req.body.game,
        prize: req.body.prize
    });
    
    balance.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'balance created'
    });
    }).catch( err => {
		console.log(err);
		res.status(500).json({ error: err})
	})
};

exports.all_time = (req, res, next) => {
    Balance.aggregate({ 
        $group: 
          { 
            _id: '$userId', 
            count:{$sum:'$prize'}
          } 
      } ).exec().then( user => {
        res.status(200).json({
			user: user
        });
    }).exec().then( user => {
        res.status(200).json({
			user: user
		});
    }).catch( err => {
		res.status(500).json({
			error: err
		})
	})
};
