const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Load environment variables
const fetch = require('node-fetch');
const AppError = require('../error/AppError');
exports.validateEmail = async (email) => {
  const apiKey = process.env.HUNTER_KEY;
  const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new AppError(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  if (data && data.data) {
    console.log('Email verification response:', data.data);
    return data.data; // Returns the result data
  } else {
    console.error('No data returned from API');
    return null;
  }
};
