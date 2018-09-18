var express = require('express');
var router = express.Router();
const GameController = require('../controllers/game');
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');


router.post('/',checkAuth, GameController.create_game);
router.get('/show',checkAuth, GameController.get_game);


module.exports = router;