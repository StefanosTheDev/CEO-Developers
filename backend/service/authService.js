const AppError = require('../error/AppError');
const utils = require('../utils/utils');
const User = require('../models/userModel');
const jwtSecurity = require('../jwt/jwtSecurity');
exports.signup = async ({ username, email, password, role }) => {
  // Check Username / Password
  utils.validateStringField(username, 'Username', { min: 6, max: 16 });
  utils.validateStringField(password, 'Password', { min: 6, max: 16 });

  // Check Email
  await utils.validateEmail(email);

  const newUser = await User.create({
    username,
    email,
    password,
    role,
  });
  return newUser;
};

exports.login = async ({ email, password }) => {
  // 1) Check Instances of Email Password
  utils.validateStringField(email, 'Email');
  utils.validateStringField(password, 'Password');

  // 2) // Find the User with that email & password
  const user = await User.findOne({ email }).select('+password'); // Check for user by email

  // 3) Check if User Obj Exist and if password is correct via middleware
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email Or Password', 401)); // 401 Unauth
  }
  // 4) Generate JWT token for user
  const token = jwtSecurity.signToken(user._id);

  // 5) Return both user and token
  return { user, token };
};
