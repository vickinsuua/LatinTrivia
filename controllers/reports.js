const mongoose = require('mongoose');
const Balance = require('../models/balance');
const Game = require('../models/game');
const User = require('../models/user');

exports.create_balance = (req, res, next) => {
    const balance = new Balance({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        game: req.body.game
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

exports.historial_balance = (req, res, next) => {
    
};

exports.games_week = (req, res, next) => {
    var fecha = new Date();
    var date = new Date();
    var day = 3;
    fecha.setDate(fecha.getDate() + day);
    console.log(fecha);
    console.log(fecha);

    Game.find({"date":{$gte:date, $lte:fecha}} ).exec().then( games => {
        if (games) {
            console.log(games)
            res.status(200).json(
                games
            );
            
        }else{
            console.log("1.3")
            return res.status(404).json({
                message: 'Game not found'
            })
        }
    }).catch(err => {
		console.log(err);
		res.status(500).json({ error: err})
	})
};

exports.friends = (req, res, next) => {
    User.findOne({"_id":req.params.id}).exec().then( user => {
        User.find({"share_code": user.referral_code}).exec().then( friends => {
            if (friends) {
                console.log(friends)
                res.status(200).json(
                    friends
                );
            }else{
                return res.status(404).json({
                    message: 'User not found'
                })
            }
        }).catch(err => {
		console.log(err);
		res.status(500).json({ error: err})
	})
    }).catch(err => {
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
