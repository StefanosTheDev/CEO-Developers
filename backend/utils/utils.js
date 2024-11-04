const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Load environment variables
const fetch = require('node-fetch');
const AppError = require('../error/AppError');

exports.validateStringField = (field, fieldName, options = {}) => {
  const { min, max } = options;

  // Check that field exists and is a string
  if (!field || typeof field !== 'string') {
    throw new AppError(`${fieldName} is not a valid string`, 400);
  }

  // Optional length validation
  if (min && field.length < min) {
    throw new AppError(`${fieldName} must be at least ${min} characters`, 400);
  }
  if (max && field.length > max) {
    throw new AppError(
      `${fieldName} must be no more than ${max} characters`,
      400
    );
  }
};

exports.validateEmail = async (email) => {
  const apiKey = process.env.HUNTER_KEY;
  const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;
  if (!apiKey) {
    throw new AppError('Cannot Read Hunter API Key');
  }
  const response = await fetch(url);
  // Check Response
  if (!response.ok) {
    throw new AppError(`HTTP error! Status: ${response.status}`, 400);
  }
  // Query Data
  const data = await response.json();
  // Is Email Valid
  if (data.data.status !== 'valid') {
    throw new AppError('Email is Invalid From API', 400);
  }
  return true;
};
