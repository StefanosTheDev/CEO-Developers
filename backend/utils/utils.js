// Goal of this function is to hit ZerBounce API Key Return The Appropiate Stuf
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Load environment variables

exports.validateEmail = async () => {
  // API Key
  // API Name
  const ZerBounceKey = process.env.ZEROBOUNCE_API_KEY_TOKEN;
  const ZerBounceKeyName = process.env.ZEROBOUNCE_API_KEY_NAME;
  const port = process.env.PORT || 3000;

  console.log(ZerBounceKey);
  console.log(ZerBounceKeyName);
  console.log(port);
  console.log('he');
};
