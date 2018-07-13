const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const Verification = require('../models/verification');

const User = require('../models/user');

exports.verificationCode = (req, res, next) => {    
   User.findById({_id: req.body.userId }).then( user => {
       if( user.lenght < 1 ){
        return res.status(404).json({
            message: 'User not found'
        });
       } else{
        const verification = new Verification({
            _id: new mongoose.Types.ObjectId(),
            userId: req.body.userId,
            contry_code: req.body.contry_code,
            phone: req.body.phone,
            verify_code: Math.floor(Math.random() * (9999 - 1000)) + 1000,
            verified: false,
            device_id: req.body.device_id});
        
         return verification.save();
       }
       
   }).then(result => {
    res.status(201).json({
        message: 'Verify code created',
        verify: {
            verifycode: result.verifycode
        }
    });
}).catch( err => {
    res.status(500).json({
        message: 'user not found',
        error: err
    })
})
};