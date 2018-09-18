const mongoose = require('mongoose');
const Setting = require('../models/setting');

exports.create_setting = (req, res, next) => {
    const setting = new Setting({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        type: req.body.type
    });
    
    setting.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'setting created'
    });
    }).catch( err => {
		console.log(err);
		res.status(500).json({ error: err})
	})
};

exports.get_setting = (req, res, next) => {
    Setting.findOne({"type":req.params.type}).then( result => {
        if (result) {
            res.status(200).json(
                result
            );
            
        }else{
            return res.status(404).json({
                message: 'Result not found'
            })
        }
        
    })
};
