var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');

const SettingController = require('../controllers/setting');


router.post('/', checkDevice,checkAuth,SettingController.create_setting);
router.get('/:type',checkDevice,checkAuth, SettingController.get_setting);


module.exports = router;