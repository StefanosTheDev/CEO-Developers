const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // so we sign that
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist?
  if (!email || !password) {
    return next(new AppError('Email Or Password Does Not Exist', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email: email }).select('+password'); // cool way to see if email exists.

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email Or Password', 401)); // 401 Unauth
  }
  // 3) If everything is okay , send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token, // all we send as a response to the login all that matters when the user logs in
  });
});

exports.protect = catchAsync(async (req, res, next) => {
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
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide'] . role ='user'

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permissions to perform this action', 403)
      );
    }
    next();
  };
};
