// Connect to MongoDB using Mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Load environment variables
module.exports = () => {
  const DB = process.env.DATABASE_URI;

  // Ensure the DB connection string is available
  if (!DB) {
    console.error('No DATABASE_URI found in environment variables.');
    process.exit(1); // Exit the process if no DB URI is found
  }
  // Attempt to connect to MongoDB
  mongoose
    .connect(DB, {})
    .then(() => console.log('MongoDB connection successful!'))
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1); // Exit on failure to connect
    });
};
