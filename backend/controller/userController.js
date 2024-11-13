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
exports.updateUserByID = async (req, res, next) => {
  try {
    const updateUser = await userService.updateUserByID(req.params, req.body);
    res.status(200).json({
      status: 'User Updated',
      data: {
        User: updateUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteUserByID = async (req, res, next) => {
  try {
    const deleteUser = await userService.deleteUserByID(req.params);
    res.status(200).json({
      status: 'User Deleted',
      data: {
        User: deleteUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getUserByID = async (req, res, next) => {
  try {
    const user = await userService.getUserByID(req.params);
    res.status(200).json({
      status: 'User Retrieved',
      data: {
        User: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ______________ FRIENDS CONTROLLER FUNCTIONS ______________ //
exports.addFriend = async (req, res, next) => {
  // If this works fine then I can insert it into the array.
  try {
  } catch (err) {
    next(err);
  }
};
exports.searchFriend = async (req, res, next) => {
  try {
    const search_results = await userService.searchFriend(req.params);
    res.status(200).json({
      status: 'Users Found',
      data: {
        search_results: search_results,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteFriend = async (req, res, next) => {};
exports.getFriends = async (req, res, next) => {};
