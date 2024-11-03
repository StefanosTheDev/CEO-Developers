// middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

const createBlogLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 1, // Limit each IP to 10 create blog requests per windowMs
  message: {
    status: 'fail',
    message:
      'Too many blog creation attempts from this IP, please try again after 15 minutes',
  },
});

module.exports = {
  createBlogLimiter,
};
