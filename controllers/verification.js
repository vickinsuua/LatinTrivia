const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Verification = require('../models/verification');
const codes = require('../responseCodes');
const User = require('../models/user');
const moment = require('moment');
const { validationResult } = require('express-validator/check');

exports.verificationPhoneDevice = (req, res, next) => {
	User.find({ "verification.phone" : req.params.phone, "verification.device_id": req.body.device_id}).exec()
	.then( verify => {
		if(verify){
			
		}
	}).catch();
};

exports.verification = (req, res, next) => {
	var momentUnix = moment().unix();
	User.findOne({ "phone":  req.body.phone, "contry_code": req.body.contry_code}).exec().then( user => {
		if(user){
			Verification.findOne({"userId": user._id, "device_id": req.body.device_id}).exec().then( device => {
				if(device){
					if(momentUnix-device.moment_unix<=60){
						return res.status(400).json({
						  response : codes.delayTimeVerification,
						  moment_unix: device.moment_unix
						});
					  } else {
						Verification.findOneAndUpdate(
							{_id:device._id},
							{$set:{'verify_code':Math.floor(Math.random() * (9999 - 1000)) + 1000, moment_unix: momentUnix, verified:false, token:null}},
							{new:true}
							).then(verification => {
								  return res.status(200).json({
										  response : codes.verificationCreated,
										  data: verification
								  });
						  })
						  .catch(err => {
							return res.status(500).json({
							  error: err.message
							});
						  }); 
					  }
				} else {
					Verification.findOneAndUpdate(
						{userId:user._id},
						{$set:{'verify_code':Math.floor(Math.random() * (9999 - 1000)) + 1000, moment_unix: momentUnix, verified:false, user:null, token:null}},
						{new:true}
						).then(verification => {
							Verification.findOne({device_id: req.body.device_id })
							.populate({
							  path: 'user',
							  match: { user: req.body.phone }
							})
							.exec()
							.then(device => {
							  if(device){
								Verification.findOneAndUpdate(
								  {_id:device._id},
								  {$set:{'verify_code':Math.floor(Math.random() * (9999 - 1000)) + 1000, moment_unix: momentUnix, verified:false, user:user._id, token:null}},
								  {new:true}
								  ).then(verification => {
									return res.status(200).json({
											response : codes.verificationCreated,
											data: verification
									});
								})
								.catch(err => {
								  return res.status(500).json({
									error: err.message
								  });
								});
							  }else{
								const verification = new Verification({
								  _id: mongoose.Types.ObjectId(),
								  userId: user._id,
								  token:null,
								  verify_code: Math.floor(Math.random() * (9999 - 1000)) + 1000,
								  verified:false,
								  device_id: req.body.device_id,
								  moment_unix: momentUnix
								});
								verification.save().then(verification => {
									  return res.status(200).json({
											  response : codes.verificationCreated,
											  data: verification
									  });
								}).catch(err => {
								  return res.status(500).json({
									error: err.message
								  });
								});
							  }
							}).catch(err => {
							  return res.status(500).json({
								error: err.message
							  });
							});
						}).catch(err => {
						  return res.status(500).json({
							error: err.message
						  });
						}); 
				}
			})
		} else {
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					avatar: "null",
					nickname: "null",
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
							if(momentUnix-device.moment_unix<=60){
								return res.status(400).json({
								  response : codes.delayTimeVerification,
								  moment_unix: device.moment_unix
								});
							  }
							  Verification.findOneAndUpdate(
								{_id:device._id},
								{$set:{'verify_code':Math.floor(Math.random() * (9999 - 1000)) + 1000, moment_unix: momentUnix, verified:false, user:user._id, token:null}},
								{new:true}
								).then(verification => {
									return res.status(200).json({
											response : codes.verificationCreated,
											data: verification
									});
							  })
							  .catch(err => {
								return res.status(500).json({
								  error: err.message
								});
							  });  
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
	const errors = validationResult(req);
	Verification.findOne({"device_id":req.params.device_id}).exec().then( verifications => {
		if (verifications){
			Verification.updateMany({"userId":verifications.userId},{$set: {"verified": false}}).exec().then( device => {
				if (device) {
					Verification.findOne({"device_id" : req.params.device_id , "verify_code": req.body.verify_code, "verified": false}).exec().then( verify => {
						if(verify){
							const token = jwt.sign({
								device_id: verify.device_id,
							}, 
							process.env.JWT_KEY);
							Verification.update({ "device_id" : req.params.device_id , "verify_code": req.body.verify_code}, {$set: {"verified": true, "token": token}}).exec()
							.then( verification => {
								return res.status(200).json({
									response : codes.correctlyVerifiedDevice,
									data: verification
									});
							}).catch();
						} else {
							return res.status(400).json({
								response : codes.failedVerification
							 });
						}
					}).catch(err => {
						return res.status(500).json({
							error: err.message
						});
					});
				}
			}).catch(err => {
				return res.status(500).json({
					error: err.message
				});
			});
		} else{
			return res.status(400).json({
				response : codes.failedVerification
			 });
		}
	}).catch(err => {
				return res.status(500).json({
					error: err.message
				});
			});
}
