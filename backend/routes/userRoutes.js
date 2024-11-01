const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.route('/users').get(userController);
module.exports = router;
