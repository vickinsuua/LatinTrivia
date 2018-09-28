const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Chatkit = require('@pusher/chatkit-server');
const codes = require('../responseCodes');

const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:8c31d173-b797-4deb-b2aa-b3c7c6087ec3",
    key: "061b7c3d-1001-48de-b1e8-75985a991265:7PuAdA8f43rzIW+0DypFzfoQF1vor9cIzwNVVjAVblI=",
  });


const bcrypt = require('bcrypt');

const User = require('../models/user');
const Verification = require('../models/verification');

const accountSid = "AC28d53249178beff60c6ed702cfc04388";
const authToken = "5fdc5d2b7e830bb8a06e823c90385600";
const client = require('twilio')(accountSid, authToken);

exports.user_profile = (req, res, next) => {
	Verification.findOne({"device_id":req.headers['device_id']}).exec().then( result => {
		if(result){
			User.findById(result.userId).select('nickname avatar  referral_code extra_life balance').exec().then( user => {
				if (!user) {
					return res.status(404).json({
						message: 'User not found'
					})
				}
				res.status(200).json(
					user
				);
			}).catch( err => {
				res.status(500).json({
					error: err
				})
			})
		} else{
			User.findById(result.userId).select('nickname avatar  referral_code extra_life balance').exec().then( user => {
				if (!user) {
					return res.status(404).json({
						message: 'User not found'
					})
				}
				res.status(200).json(
					user
				);
			}).catch( err => {
				res.status(500).json({
					error: err
				})
			})
		}
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

exports.register_final = (req, res, next) => {
	Verification.findOne({"device_id": req.headers['device_id'], "verified": true}).then( verification => {
		console.log(req.body);
		User.findOneAndUpdate({ _id: verification.userId},
			{$set:{"avatar":req.file.filename,"nickname":req.body.nickname, "share_code":req.body.nickname , "referral_code":req.body.referral_code }},{new: true}).exec().then( result => {
				User.findOneAndUpdate({ share_code: result.referral_code },{ $inc: {'extra_life':1 } }).then( otherUser => {
					if(otherUser){
						User.findOneAndUpdate({ referral_code: otherUser.share_code, _id: verification.userId },{ $inc: {'extra_life':1} }).then( final => {
							res.status(200).json({
								message: 'Register complete'
							})
						}).catch(err => {
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
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
	
};

exports.add_extra_life = (req, res, next) => {
	User.findOneAndUpdate({ _id: req.params.id},{$set:{"referral_code":req.body.referral_code}}).exec().then( result => {
		console.log(result)
		User.findOneAndUpdate({ share_code: req.body.referral_code},{ $inc: {'extra_life':1 } }).then( otherUser => {
			console.log(otherUser)
			if(otherUser){
				User.findOneAndUpdate({ "_id": req.params.id},{ $inc: {'extra_life':1} }).then( final => {
					console.log(final)
					res.status(200).json({
						message: 'Add extra life'
					})
				}).catch(err => {
					res.status(500).json({
						error: err
					});
				})
			} else {
				res.status(200).json({
					message: 'Cant add life'
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
};

