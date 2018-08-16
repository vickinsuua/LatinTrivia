const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const bcrypt = require('bcrypt');

const User = require('../models/user');
const Verification = require('../models/verification');

const accountSid = "AC28d53249178beff60c6ed702cfc04388";
const authToken = "5fdc5d2b7e830bb8a06e823c90385600";
const client = require('twilio')(accountSid, authToken);

exports.user_signup = (req, res, next) => {
	User.find({ "phone":  req.body.phone, "contry_code": req.body.contry_code}).exec().then( user => {
		if (user.length >= 1 ) {
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
					share_code:"null",
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

	Verification.findOne({"device_id":req.body.device_id, "token":req.body.device_id})

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

exports.users_get_all = (req, res, next) => {
	User.find().select('_id nickname avatar contry_code phone referral_code extra_life balance').exec().then( user => {
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
};


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



exports.register_final = (req, res, next) => {
	Verification.findOne({"device_id": req.body.device_id, "verified": true}).then( verification => {
		User.findOneAndUpdate({ _id: verification.userId},
			{$set:{"avatar": req.body.avatar, "nickname":req.body.nickname, "share_code":req.body.nickname , "referral_code":req.body.referral_code }},{new: true}).exec().then( result => {
				User.findOneAndUpdate({ share_code: result.referral_code },{ $inc: {'extra_life':1 } }).then( otherUser => {
					if(otherUser){
						User.findOneAndUpdate({ referral_code: otherUser.share_code, _id: verification.userId },{ $inc: {'extra_life':1} }).then( final => {
							console.log(final)
							res.status(200).json({
								message: 'Register complete'
							})
						}).catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						})
					} else {
						res.status(200).json({
							message: 'Register complete'
						})
					}
				}).catch(err => {
					console.log(err);
					res.status(500).json({
						error: err
					});
				})
		   }).catch( err => {
			   console.log(err);
			   res.status(500).json({
				   error: err
			   });
		   })
	})
	
};

