const AppError = require('../error/AppError');
const fs = require('fs');
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Log error to file in production
    const errorLog = `Time: ${new Date().toISOString()}\nError: ${
      err.message
    }\nStatus: ${err.statusCode || 500}\nStack: ${err.stack}\n\n`;

    // Corrected syntax for fs.appendFileSync
    fs.appendFileSync(
      '/Users/stefanossophocleous/Desktop/CEO Developers/CEO-Developers/backend/logs/prod_errors.log',
      errorLog
    );

    res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err instanceof AppError) {
      error = err;
    }

    sendErrorProd(error, res);
  }
};
