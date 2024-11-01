const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Load environment variables
const fetch = require('node-fetch');
const AppError = require('../error/AppError');

exports.validateEmail = async (email) => {
  const apiKey = process.env.HUNTER_KEY;
  const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;
  const response = await fetch(url);

  // Check Response
  if (!response.ok) {
    throw new AppError(`HTTP error! Status: ${response.status}`);
  }
  // Query Data
  const data = await response.json();
  // Is Email Valid
  if (data.data.status !== 'valid') {
    throw new AppError('Email is Invalid From API');
  }
};
