const authService = require('../service/authService');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({
      status: 'User Created',
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
    res.status(200).json({
      status: 'Login Successful',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.logout = async (req, res, next) => {};

exports.forgotpass = async (req, res, next) => {};
