const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { authSchema, loginSchema } = require('../zodSchemas/authSchema');
const { validate } = require('../middleware/validationMiddleware');

router.route('/signup').post(validate(authSchema), authController.signup);
router.route('/login').post(validate(loginSchema), authController.login);
module.exports = router;
