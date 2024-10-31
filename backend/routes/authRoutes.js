const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.route('/signup').post(authController.signup);
//ççrouter.route('/login'.post());

module.exports = router;
