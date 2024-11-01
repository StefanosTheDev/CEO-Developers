// Exporting the Arrow function
const mongoose = require('mongoose');
const AppError = require('../error/AppError');
const { MongoServerError } = require('mongodb');

module.exports = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
  // Handling MongoDB-specific errors
  if (err instanceof MongoServerError) {
    switch (err.code) {
      case 11000: // Duplicate key error
        return res.status(400).json({
          status: 'fail',
          message: `Duplicate key error: ${JSON.stringify(err.keyValue)}`,
        });
      case 121: // Document validation error
        return res.status(400).json({
          status: 'fail',
          message: 'Document validation failed.',
        });
      case 50: // Query timeout
        return res.status(500).json({
          status: 'error',
          message: 'Query timed out. Please try again.',
        });
      default: // Other MongoDB errors
        return res.status(500).json({
          status: 'error',
          message: 'A MongoDB server error occurred.',
        });
    }
  }
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};
// dont need next() cuz im stopping here
