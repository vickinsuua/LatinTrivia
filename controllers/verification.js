const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Verification = require('../models/verification');

const User = require('../models/user');

exports.verificationPhoneDevice = (req, res, next) => {
	User.find({ "verification.phone" : req.params.phone, "verification.device_id": req.body.device_id}).exec()
	.then( verify => {
		if(verify){
			
		}
	}).catch();
};

exports.verification = (req, res, next) => {
	User.find({ "phone":  req.body.phone, "contry_code": req.body.contry_code, "device_id": req.body.device_id}).exec().then( user => {
		if (user.length > 1 ) {
			return res.status(409).json({
				message: 'User exist'
			});
		} else {
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					nickname: "null",
					avatar: "null",
					share_code:"null",
					referral_code: "null",
					extra_life:"0",
					balance:"0",
					contry_code: req.body.contry_code,
					phone: req.body.phone
				})
				user.save().then(user => {
					Verification.findOne({"device_id":req.body.device_id}).exec().then( device => {
						if(device){
							console.log(device);
						} else{
							if(!(user.phone == undefined)){
								const verification = new Verification({
									_id: new mongoose.Types.ObjectId(),
									userId: user._id,
									verify_code: Math.floor(Math.random() * (9999 - 1000)) + 1000,
									verified: false,
									device_id: req.body.device_id
								})
								verification.save().then(result => {
									res.status(201).json({
										message: 'User and Verification code created'
									});
								}).catch(err => {
									res.status(500).json({
										message: 'Something when wrong',
										error: err
									})
								});
							} else{
								const token = jwt.sign({
									_id: user._id,
								}, 
								process.env.JWT_KEY);
								const verification = new Verification({
									_id: new mongoose.Types.ObjectId(),
									userId: user._id,
									verify_code: null,
									token:req.body.token,
									verified: true,
									Facebook: true,
									device_id: req.body.device_id
								})
								verification.save().then(result => {
									res.status(201).json({
										message: 'User and Verification code created'
									});
								}).catch(err => {
									res.status(500).json({
										message: 'Something when wrong',
										error: err
									})
								});
							}
						}
					})
				}).catch(err => {
					res.status(500).json({
						message: 'Something when wrong',
						error: err
					})
				});
				
		}
	})
};

exports.verification_code = (req, res, next) => {
	Verification.findOne({"device_id" : req.params.device_id , "verify_code": req.body.verify_code}).then( verify => {
		if(verify){
			const token = jwt.sign({
				device_id: verify.device_id,
			}, 
			process.env.JWT_KEY);
			Verification.update({ "device_id" : req.params.device_id , "verify_code": req.body.verify_code}, {$set: {"verified": true, "token": token}}).exec()
			.then( code => {
				if(code){
					return res.status(200).json({
						message: 'verificado'
					});
				}else {
					return res.status(409).json({
						message: 'wrong code'
					});
				}
			}).catch();
		} else {
			console.log('no');
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			message: 'Something when wrong',
			error: err
		})
	});
	
}
