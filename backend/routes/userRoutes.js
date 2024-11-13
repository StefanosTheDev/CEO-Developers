const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const jwtSecurity = require('../jwt/jwtSecurity');
const { isAdminSchema, updateSchema } = require('../zodSchemas/authSchema');
const { idOnlySchema } = require('../zodSchemas/authSchema');
const {
  validate,
  validateRole,
} = require('../middleware/validationMiddleware');

router
  .route('/getUsers')
  .get(
    jwtSecurity.protect,
    validateRole(isAdminSchema),
    userController.getAllUsers
  );

router
  .route('/:id')
  .put(
    jwtSecurity.protect,
    validate(updateSchema),
    userController.updateUserByID
  )
  .delete(
    jwtSecurity.protect,
    validate(idOnlySchema),
    userController.deleteUserByID
  )
  .get(jwtSecurity.protect, validate(idOnlySchema), userController.getUserByID);

// Friends Routes
router.route('/search/:username').post(userController.searchFriend);
module.exports = router;
