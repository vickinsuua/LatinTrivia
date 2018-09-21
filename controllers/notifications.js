const mongoose = require('mongoose');
const Notification = require('../models/notification');

exports.create_notification =   (req, res, next) => {
	const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        notification: req.body.notification,
        type: req.body.type,
        time: req.body.time
    });
    
    notification.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'notification created'
    });
    }).catch( err => {
		console.log(err);
		res.status(500).json({ error: err})
	})
	
};

exports.get_notifications_show = (req, res, next) => {
    var date = new Date();
    Notification.findOne({"date":{$lte:date}, "type":req.params.type}).then( notification => {
        if (notification) {
            res.status(200).json(
                notification
            );
        }else{
            return res.status(404).json({
                message: 'notification not found'
            })
        }
        
    })
};

exports.get_notifications= (req, res, next) => {
    var date = new Date(); 
    console.log(date)
    Notification.find({"type":"general","is_read":0}).then( notification => {
        if (notification) {
            res.status(200).json(
                notification
            );
        }else{
            return res.status(404).json({
                message: 'notification not found'
            })
        }
        
    })
};