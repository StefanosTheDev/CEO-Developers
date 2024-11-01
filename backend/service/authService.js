const AppError = require('../error/AppError');
const utils = require('../utils/utils');
const User = require('../models/userModel');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // so we sign that
};

const validateSignUp = async (username, email, password, role) => {
  // Unsure what I want to do with Role just yet
};

exports.signup = async ({ username, email, password, role }) => {
  // Check Input Variables
  utils.validateStringField(username, 'Username', { min: 6, max: 16 });
  utils.validateStringField(password, 'Password', { min: 6, max: 16 });
  utils.validateStringField(email, 'Email');

  // Hit API Call for Validate Email
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
  // 1) Check if email and password exist
  if (!email || !password) {
    throw new AppError('Email or Password does not exist', 400);
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password'); // Check for user by email

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email Or Password', 401)); // 401 Unauth
  }
  // 3) Generate a token for the user
  const token = signToken(user._id);

  // 4) Return both user and token
  return { user, token };
};
