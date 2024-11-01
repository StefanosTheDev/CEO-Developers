const jwt = require('jsonwebtoken');
const AppError = require('../error/AppError');
const { promisify } = require('util');
const User = require('../models/userModel');
exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // so we sign that
};

exports.protect = async (req, res, next) => {
  // 1) Get token and check of it's there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; // this way we get the actual token of this
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! PLease log into get access', 401)
    );
  }
  // 2) Verification Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  // this checks if the user token still exist. Because the user if they were deleted now they cant steal those creds
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does not longer exist ')
    );
  }

  // 4) Check if user changed passwords after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently change dpassword! Please log in again', 401)
    );
  }
  req.user = currentUser;
  next();
};
