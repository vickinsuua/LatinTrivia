var express = require('express');
var router = express.Router();

const SettingController = require('../controllers/setting');


router.post('/', SettingController.create_setting);
router.get('/:id', SettingController.get_setting);


module.exports = router;