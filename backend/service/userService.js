const AppError = require('../error/AppError');
const jwtSecurity = require('../jwt/jwtSecurity');
const User = require('../models/userModel');

exports.getAllUsers = async () => {
  // Query All Blogs
  const users = await User.find({}); // get all Users
  if (!users) {
    throw new AppError('No Users exist');
  }
  return users;
};
