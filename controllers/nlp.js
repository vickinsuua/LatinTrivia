var natural = require('natural');
var tokenizer = new natural.OrthographyTokenizer({language: "es"});


exports.test = (req, res, next) => {
    testing = tokenizer.tokenize(req.body.test);
    console.log(testing);
};