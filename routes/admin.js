const router = require('express').Router();
const path = require('path');
const AuthController = require('../controller/Admin/AuthController');
const BaseController = require('../controller/Admin/BaseController');
/* Filter (Middleware) Management */
const { beforeLogin } = require('../middleware/Admin');


router.post('/create_category', beforeLogin, AuthController.create_category);
router.post('/update_category', beforeLogin, AuthController.update_category);
router.get('/get_category', beforeLogin, AuthController.get_category);
router.post('/delete_category', beforeLogin, AuthController.delete_category);
module.exports = router;
