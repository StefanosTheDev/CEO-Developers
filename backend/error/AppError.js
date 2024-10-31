class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent constructor (Error) with the message

    this.statusCode = statusCode; // HTTP status code (e.g., 404, 500)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 'fail' for 4xx client errors, 'error' for 5xx server errors

    // Capture the stack trace and attach it to the error object, but avoid including the constructor in the stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
