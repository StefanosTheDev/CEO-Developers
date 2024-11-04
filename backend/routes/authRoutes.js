const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { authSchema } = require('../zodSchemas/authSchema');
const { validateBody } = require('../middleware/validationMiddleware');

router.route('/signup').post(validateBody(authSchema), authController.signup);
router.route('/login').post(authController.login);
module.exports = router;
