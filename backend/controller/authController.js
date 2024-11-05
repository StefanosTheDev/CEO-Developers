const authService = require('../service/authService');
exports.signup = async (req, res, next) => {
  try {
    const incommingUser = req.body;
    const user = await authService.signup(incommingUser);
    res.status(201).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    // Respond with the user and token
    res.status(201).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
