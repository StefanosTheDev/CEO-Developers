const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const jwtSecurity = require('../jwt/jwtSecurity');
const { z } = require('zod'); // import zod
const { validateBody } = require('../middleware/validationMiddleware');
const { blogSchema } = require('../zodSchemas/blogSchema');

// Protect This Route
router
  .route('/createBlog')
  .post(
    jwtSecurity.protect,
    validateBody(blogSchema),
    blogController.createBlog
  );

// router
//   .route('/like/:blogId')
//   .post(jwtSecurity.protect, blogController.likeBlog);

module.exports = router;
