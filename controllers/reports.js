const mongoose = require('mongoose');
const Balance = require('../models/balance');
const Game = require('../models/game');
const User = require('../models/user');

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

exports.historial_balance = (req, res, next) => {
    Balance.aggregate([
        {
            $group:
            {
                _id:"$userId",
                totalBalance:{ $sum: "$prize"}
            }
        },
        {
            $sort: {totalBalance:-1}
        },
        {
            $lookup:
            {
                from:"users",
                localField:"_id",
                foreignField:"_id",
                as:"users"
            }
        },
        {$unwind: '$users'}
    ]).exec().then( total => {
        if (total) {
            res.status(200).json(
                total
            );
        }else{
            return res.status(404).json({
                message: 'Balance not found'
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err})
    })
};

exports.week_balance = (req, res, next) => {
    var date_week = new Date();
    var date = new Date();
    var days = 3;
    date_week.setDate(date_week.getDate() - days)
    Balance.aggregate([
        {
            $match:
                {
                    "createdAt":{$gte: date_week,
                                 $lte: date }
                }
        },
        {
            $group:
                {
                    _id:"$userId",
                    totalBalance:{ $sum: "$prize"}
                }
        },
        {
            $sort:{totalBalance:-1}
        },
        {
            $lookup:
            {
                from:"users",
                localField:"_id",
                foreignField:"_id",
                as:"users"
            }
        },
        {$unwind: '$users'}
    ]).exec().then( balances => {
        if (balances) {
            res.status(200).json(
                balances
            );
        }else{
            return res.status(404).json({
                message: 'Balance not found'
            })
        }
    }).catch(err => {
		res.status(500).json({ error: err})
	})
};

exports.games_week = (req, res, next) => {
    var fecha = new Date();
    var date = new Date();
    var days = 3;
    fecha.setDate(fecha.getDate() + days);

    Game.find({"date":{$gte:date, $lte:fecha}} ).exec().then( games => {
        if (games) {
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

exports.historial_friends = (req, res, next) => {
    var balances_array = [];
    User.findOne({"_id":req.params.id}).exec().then( user => {
        User.find({$or:[{"share_code": user.referral_code},{"referral_code":user.share_code}]}).exec().then( friends => {
            friends.forEach(function(element){
                Balance.aggregate([
                    {
                        $match:
                            {
                                "userId":element._id
                            }
                    },
                    {
                        $group:
                        {
                            _id:"$userId",
                            totalBalance:{ $sum: "$prize"},
                        }
                    },
                    {
                        $lookup:
                        {
                            from:"users",
                            localField:"_id",
                            foreignField:"_id",
                            as:"users"
                        }
                    },
                    {$unwind: '$users'}
                ]).exec().then( friendsB => {
                    balances_array.push(friendsB[0]);
                    if(balances_array.length == friends.length){
                        res.status(200).json(balances_array)
                    }
                }).catch(err => {
                    res.status(500).json({ error: err})
                })
            })
        }).catch(err => {
		res.status(500).json({ error: err})
	})
    }).catch(err => {
		res.status(500).json({ error: err})
	})
};

exports.week_friends = (req, res, next) => {
    var date_week = new Date();
    var date = new Date();
    var days = 3;
    var balances_array = [];
    date_week.setDate(date_week.getDate() - days)
    console.log(date_week)
    console.log(date)
    User.findOne({"_id":req.params.id}).exec().then( user => {
        User.find({$or:[{"share_code": user.referral_code},{"referral_code":user.share_code}]}).exec().then( friends => {
            friends.forEach(function(element){
                Balance.aggregate([
                    {
                        $match:
                            {
                                "userId":element._id,
                                "createdAt":{$gte: date_week,
                                 $lte: date }
                                
                            }
                    },
                    {
                        $group:
                        {
                            _id:"$userId",
                            totalBalance:{ $sum: "$prize"},
                        }
                    },
                    {
                        $lookup:
                        {
                            from:"users",
                            localField:"_id",
                            foreignField:"_id",
                            as:"users"
                        }
                    },
                    {$unwind: '$users'}
                ]).exec().then( friendsBW => {
                    balances_array.push(friendsBW[0]);
                    if(balances_array.length == friends.length){
                            res.status(200).json(balances_array)
                    }
                })
                .catch(err => {
                    res.status(500).json({ error: err})
                })
            })
        }).catch(err => {
        res.status(500).json({ error: err})
    })
    }).catch(err => {
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
