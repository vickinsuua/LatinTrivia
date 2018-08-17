const mongoose = require('mongoose');
const Game = require('../models/game');

exports.create_game = (req, res, next) => {
    const game = new Game({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        prize: req.body.prize
    });
    
    game.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'game created'
    });
    }).catch( err => {
		console.log(err);
		res.status(500).json({ error: err})
	})
};

exports.get_game = (req, res, next) => {
    console.log("1")
    Game.findOne({"date":req.params.date}).then( game => {
        if (game) {
            console.log(game)
            res.status(200).json(
                game
            );
            
        }else{
            console.log("1.3")
            return res.status(404).json({
                message: 'Game not found'
            })
        }
        
    })
};