const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const User = require('../models/user');
const Verification = require('../models/verification');

const accountSid = "AC28d53249178beff60c6ed702cfc04388";
const authToken = "5fdc5d2b7e830bb8a06e823c90385600";
const client = require('twilio')(accountSid, authToken);

exports.verificationPhoneDevice = (req, res, next) => {
	User.find({ "verification.phone" : req.params.phone, "verification.device_id": req.body.device_id}).exec()
	.then( verify => {
		if(verify){
			
		}
	}).catch();
};

exports.verificationCode = (req, res, next) => {

};

exports.user_signup = (req, res, next) => {
	User.find({ "phone":  req.body.phone, "contry_code": req.body.contry_code }).exec().then( user => {
		if (user.length >= 1) {
			return res.status(409).json({
				message: 'Phone number exists',
				request: {
					type: 'POST',
					url: 'http://localhost:3000/login'
				}
			});
		} else {
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					nickname: "null",
					avatar: "null",
					referral_code: "null",
					extra_life:"0",
					balance:"0",
					contry_code: req.body.contry_code,
					phone: req.body.phone
				})
				user.save().then(result => {
					console.log(result);
					res.status(201).json({
						message: 'User created',
						request: {
							type: 'POST',
							url: 'http://localhost:3000/verification'
						}
					});
				}).catch(err => {
					console.log(err);
					res.status(500).json({
						message: 'Something when wrong',
						error: err
					})
				});
		}
	})
};

exports.user_created = (req, res, next) => {
	Verification.find({ userId: req.params.userId, verified: "true"}).then( verify => {
		if ( verify.length < 1){
			return res.status(409).json({
				message: 'User not found'
			});
		} else {
			User.findByIdAndUpdate({_id: req.params.userId}, {$set:{'nickname': req.body.nickname, 'referral_code': req.body.referral_code }},
            {new:true}).then( user => {
				return res.status(200).json({
                    user: user
             	});
			}).catch(err => {
				return res.status(500).json({
				  error: err
				});
			  }); 
		}
	})
};

exports.user_login = (req, res, next) => {
	User.findOne({ nickname: req.body.nickname }).exec().then( user => {
		if (user.length < 1) {
			return res.status(401).json({
				message: 'Auth failed'
			});
		} else {
			bcrypt.compare(req.body.password, user.password, function(err, result){
				if ( err ) {
					return res.status(401).json({
						message: 'Auth failed'
					});
				}
				if ( result ) {
					const token = jwt.sign({
						nickname: user.nickname,
						userId: user._id
					}, 
					process.env.JWT_KEY,
					{
						expiresIn: "1h"
					});
					return res.status(200).json({
						message: 'Auth successful',
						token: token
					});
				} else {
					return res.status(401).json({
						message: 'Auth failed password',
						token: token
					});
				}
			})
	}
	}).catch( err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
};

exports.user_profile = (req, res, next) => {

	const id = req.params.userId;

	User.findById(id).select('nickname avatar  referral_code extra_life balance').exec().then( user => {
		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			})
		}
		res.status(200).json({
			user: user
		});
	}).catch( err => {
		res.status(500).json({
			error: err
		})
	})
}


exports.user_delete = (req, res, next) => {
	User.deleteOne({ _id: req.params.userId }).exec().then( result => {
		res.status(200).json({
			message: 'User deleted'
		})
	}).catch( err => {
		res.status(500).json({
			error: err
		})
	});
};