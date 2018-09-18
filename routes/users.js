var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkDevice = require('../middleware/check-device');
const multer = require('multer');
const { check, validationResult } = require('express-validator/check');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const UserController = require('../controllers/user');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.get('/',checkAuth, UserController.user_profile);

router.get('/all/users',checkAuth, UserController.users_get_all);

// router.patch('/addExtraLife' ,UserController.add_extra_life);

router.patch('/registerfinal',upload.single('avatar'),checkDevice,checkAuth,UserController.register_final);

module.exports = router;