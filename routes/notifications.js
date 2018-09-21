var express = require('express');
var router = express.Router();
const NotificationController = require('../controllers/notifications');
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');


router.post('/',checkAuth, NotificationController.create_notification);
router.get('/:showtime',checkAuth, NotificationController.get_notifications_show);
router.get('/general/mailbox',checkAuth, NotificationController.get_notifications);


module.exports = router;