const authService = require('../service/authService');
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await authService.signup({
      username,
      email,
      password,
      role,
    });
    // Respond with the created user
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
module.exports.login = async (req, res, next) => {};
