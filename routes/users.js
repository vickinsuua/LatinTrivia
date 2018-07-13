var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', UserController.user_signup);

router.get('/:userId', UserController.user_profile);

router.post('/login', UserController.user_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

router.post('/:userId',UserController.user_created);



module.exports = router;