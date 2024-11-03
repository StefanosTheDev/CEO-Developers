// middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

const rateLimitRequests = rateLimit({
  windowMs: 100 * 60 * 1000, // 15 minutes
  max: 1, // Limit each IP to 10 create blog requests per windowMs
  message: {
    status: 'fail',
    message:
      'Too many blog creation attempts from this IP, please try again after 15 minutes',
  },
});

module.exports = {
  rateLimitRequests,
};
