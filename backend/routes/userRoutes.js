const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const jwtSecurity = require('../jwt/jwtSecurity');
const { isAdminSchema } = require('../zodSchemas/authSchema');
const { validateRole } = require('../middleware/validationMiddleware');

router
  .route('/getUsers')
  .get(
    jwtSecurity.protect,
    validateRole(isAdminSchema),
    userController.getAllUsers
  );

module.exports = router;
