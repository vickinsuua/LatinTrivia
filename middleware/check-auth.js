const codes = require('../responseCodes');

module.exports = (req, res, next) => {
	if(req.headers['api-token'] == process.env.ACCOUNT_SECURITY_API_KEY) {
		next();
	}else{
		return res.status(401).json({
			response : codes.AuthFailed
		});
	}
 };