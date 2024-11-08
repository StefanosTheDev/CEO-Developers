const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const jwtSecurity = require('../jwt/jwtSecurity');
const { isAdminSchema, updateSchema } = require('../zodSchemas/authSchema');
const { deleteSchema } = require('../zodSchemas/authSchema');
const { validate } = require('../middleware/validationMiddleware');

router
  .route('/getUsers')
  .get(
    jwtSecurity.protect,
    validate(isAdminSchema),
    userController.getAllUsers
  );
router
  .route('/update/:id')
  .put(
    jwtSecurity.protect,
    validate(updateSchema),
    userController.updateUserByID
  );

router
  .route('/delete/:id')
  .delete(
    jwtSecurity.protect,
    validate(deleteSchema),
    userController.deleteUserByID
  );

module.exports = router;
