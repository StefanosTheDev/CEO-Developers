const AppError = require('../error/AppError');
const utils = require('../utils/utils');
const User = require('../models/userModel');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // so we sign that
};

const validateSignUp = async (username, email, password, role) => {
  if (!username || typeof username !== 'string') {
    throw new AppError('Name does not meet the parameter', 400);
  }
  // Deflect Prior To Hitting Token
  if (!email || typeof email !== 'string') {
    throw new AppError('Name does not meet the parameter', 400);
  }
  // Hit the HUNTER API NOW
  await utils.validateEmail(email);

  if (!password || typeof password !== 'string') {
    throw new AppError('Password Doesnt Exist', 400);
  }
};

exports.signup = async ({ username, email, password, role }) => {
  // Validate Sign Up Creds
  await validateSignUp(username, email, password, role);
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
