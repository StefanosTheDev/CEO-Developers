const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const jwtSecurity = require('../jwt/jwtSecurity');

// Protect This Route
router
  .route('/createBlog')
  .post(jwtSecurity.protect, blogController.createBlog);

router
  .route('/like/:blogId')
  .post(jwtSecurity.protect, blogController.likeBlog);

module.exports = router;
