const AppError = require('../error/AppError');
const utils = require('../utils/utils');
const User = require('../models/userModel');
const jwtSecurity = require('../jwt/jwtSecurity');

exports.signup = async ({ username, email, password }) => {
  const newUser = await User.create({ username, email, password });
  return newUser;
};
exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password'); // Check for user by email
  if (!user || !(await this.correctPassword(password, user.password))) {
    throw new AppError('Incorrect Email Or Password', 401); // 401 Unauth
  }
  const token = jwtSecurity.signToken(user._id);
  return { user, token };
};
exports.correctPassword = async function (incomPass, userPassword) {
  return await bcrypt.compare(incomPass, userPassword); // return true if same . False if not
};
