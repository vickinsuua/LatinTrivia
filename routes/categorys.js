var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');


const CategoryController = require('../controllers/category');


router.post('/',checkAuth, CategoryController.create_category);
router.get('/all',checkAuth, CategoryController.get_category);


module.exports = router;