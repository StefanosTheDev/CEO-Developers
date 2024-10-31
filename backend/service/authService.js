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
    throw new AppError('Password Doesnt Exist');
  }
  if (!role || typeof role !== 'string') {
    throw new AppError('Role Doesnt exist');
  }
};

exports.signup = async ({ username, email, password, role }) => {
  // Validate Sign Up Creds
  validateSignUp(username, email, password, role);

  const newUser = await User.create({
    username,
    email,
    password,
    role,
  });
  return newUser;
};

exports.login = async () => {};
