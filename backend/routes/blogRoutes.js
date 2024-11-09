const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const jwtSecurity = require('../jwt/jwtSecurity');
const {
  validate,
  validateRole,
} = require('../middleware/validationMiddleware');
const {
  blogSchema,
  updateBlogSchema,
  deleteBlogSchema,
} = require('../zodSchemas/blogSchema');
const { rateLimitRequests } = require('../middleware/ratelimitingMiddleware');
const { isAdminSchema } = require('../zodSchemas/authSchema');

// Protect This Route
router
  .route('/createBlog')
  .post(jwtSecurity.protect, validate(blogSchema), blogController.createBlog);

router.route('/allBlogs').get(jwtSecurity.protect, blogController.getAllBlogs);

router
  .route('/:id')
  .put(
    jwtSecurity.protect,
    validate(updateBlogSchema),
    blogController.updateBlogByID
  )
  .get(jwtSecurity.protect, validate(blogSchema), blogController.getBlogByID)
  .delete(
    jwtSecurity.protect,
    validateRole(isAdminSchema),
    validate(deleteBlogSchema),
    blogController.deleteBlogByID
  );

module.exports = router;
