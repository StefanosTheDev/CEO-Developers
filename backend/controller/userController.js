const userService = require('../service/userService');
exports.getAllUsers = async (req, res, next) => {
  try {
    // Hit the service
    console.log(req.user);
    console.log(req.params);
    console.log(req.body);
    const allUsers = await userService.getAllUsers();
    res.status(201).json({
      status: 'success',
      data: {
        user: allUsers,
      },
    });
  } catch (err) {
    next(err);
  }
};
