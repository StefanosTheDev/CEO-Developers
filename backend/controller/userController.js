const userService = require('../service/userService');
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json({
      status: 'success',
      data: {
        user: allUsers,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateUserByID = async (req, res, next) => {};

exports.deleteUserByID = async (req, res, next) => {};
