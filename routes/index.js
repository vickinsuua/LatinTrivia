var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/detail', function(req, res, next) {
  res.send('hi you');
});

module.exports = router;