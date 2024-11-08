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

// Need To maybe handle if it's the same data being requestd from update / non
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
    throw new Error('User not found'); // Handle Blog not found case
  }

  return updateUser;
  // Look Into The Req Object. If Req.body exists send it . If Req.param xist
};

exports.deleteUserByID = async ({ id }) => {
  const delUser = await User.findByIdAndDelete(id);
  if (!delUser) {
    throw new AppError('User Not Found');
  }
  console.log(delUser.username);
  return delUser;
};
