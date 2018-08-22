var express = require('express');
var router = express.Router();

const CategoryController = require('../controllers/category');


router.post('/', CategoryController.create_category);
router.get('/all', CategoryController.get_category);


module.exports = router;