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
exports.updateUserByID = async ({ id }, { username, email, password }) => {
  // Build an updateData object with only the fields that are provided
  const updatedData = {};
  if (username) updatedData.username = username;
  if (email) updatedData.email = email;
  if (password) updatedData.password = password;

  const updateUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation for updated fields
  });

  if (!updateUser) {
    throw new Error('User not found');
  }

  return updateUser;
  // Look Into The Req Object. If Req.body exists send it . If Req.param xist
};
exports.deleteUserByID = async ({ id }) => {
  // for this if the ID doesnt exist. Then its a cast erro

  const delUser = await User.findByIdAndDelete(id);
  if (!delUser) {
    throw new AppError('User Not Found');
  }
  return delUser;
};
exports.getUserByID = async ({ id }) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found');
  }
  return user;
};
