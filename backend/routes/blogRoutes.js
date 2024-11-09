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
const { isAdminSchema, idOnlySchema } = require('../zodSchemas/authSchema');

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
  .get(jwtSecurity.protect, validate(idOnlySchema), blogController.getBlogByID)
  .delete(
    jwtSecurity.protect,
    validateRole(isAdminSchema),
    validate(deleteBlogSchema),
    blogController.deleteBlogByID
  );

router.route('/like/:id').post(jwtSecurity.protect, blogController.like);

router.route('/upvote/:id').post(jwtSecurity.protect, blogController.upvote);
module.exports = router;
