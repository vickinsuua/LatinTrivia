const VerificationModel = require('../models/verification');

module.exports = (req, res, next) => {
    VerificationModel.findOne({ device_id: req.headers['device_id'],token: req.headers['user-token'], verified: true})
    .exec()
    .then(device => {
        if(device){
            next();    
        }else{
            return res.status(400).json({
                response : 'no verify'
            });    
        }
    });
};