const AppError = require('../error/AppError');
const utils = require('../utils/utils');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // so we sign that
};

const validateSignUp = async (username, email, password, role) => {
  //   if (!username || typeof str !== 'string') {
  //     throw new AppError('Name does not meet the parameter', 400);
  //   }
  if (!email || typeof str !== 'string') {
    await utils.validateEmail(email);
    throw new AppError('Name does not meet the parameter', 400);
  }
  if (!password || typeof str !== 'string') {
    throw new AppError('Password Doesnt Exist');
  }
  if (!role || typeof str !== 'string') {
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
