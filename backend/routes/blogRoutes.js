const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const jwtSecurity = require('../jwt/jwtSecurity');

// Protect This Route
router
  .route('/createBlog')
  .post(jwtSecurity.protect, blogController.createBlog);
module.exports = router;
