const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

router.route('/createBlog').post(blogController.createBlog);
router.route('/getAllBlogs').get(blogController.getAllBlogs);
module.exports = router;
