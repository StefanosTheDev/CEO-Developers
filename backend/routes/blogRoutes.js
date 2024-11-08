const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const jwtSecurity = require('../jwt/jwtSecurity');
const { validateBody } = require('../middleware/validationMiddleware');
const { blogSchema } = require('../zodSchemas/blogSchema');
const { rateLimitRequests } = require('../middleware/ratelimitingMiddleware');
// Protect This Route
router
  .route('/createBlog')
  .post(
    jwtSecurity.protect,
    validateBody(blogSchema),
    blogController.createBlog
  );
router.route('/allBlogs').get(jwtSecurity.protect, blogController.getAllBlogs);

router.route('/:id').put(jwtSecurity.protect, blogController.updateBlogByID);

module.exports = router;
