var express = require('express');
var router = express.Router();

const GameController = require('../controllers/game');


router.post('/', GameController.create_game);
router.get('/show/:date', GameController.get_game);


module.exports = router;