const AppError = require('../error/AppError');
const blogService = require('../service/blogService');
exports.createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newBlogPost = await blogService.createBlog({
      title,
      content,
      authorId: req.user._id,
    });
    res.status(201).json({
      status: 'success',
      data: {
        newBlog: newBlogPost,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getAllBlogs = async (req, res, next) => {
  try {
    const getAllBlogs = await blogService.getAllBlogs();
    res.status(200).json({
      status: 'success',
      data: {
        Blogs: getAllBlogs,
        admin_id: req.user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateBlogByID = async (req, res, next) => {
  try {
    const incommingBlogID = req.params; // Get the user ID from URL params
    const incommingBlog = req.body; // Destructure the potential update fields

    // Call the service to update the Blog
    const blog = await blogService.updateBlogByID(
      incommingBlogID,
      incommingBlog
    );
    res.status(200).json({
      status: 'delete success',
      data: {
        blog: blog,
        admin_id: req.user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteBlogByID = async (req, res, next) => {
  try {
    const blog = await blogService.deleteBlogByID(req.params);
    res.status(200).json({
      status: 'success',
      data: {
        blog: blog,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getBlogByID = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogByID(req.params);
    res.status(200).json({
      status: 'success',
      data: {
        blog: blog,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.like = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const action = await blogService.likes_or_upvotes(
      user_id,
      req.params,
      'likes'
    );

    res.status(200).json({
      status: 'liked',
      data: {
        blogPost: action,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.upvote = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const action = await blogService.likes_or_upvotes(
      user_id,
      req.params,
      'upvotes'
    );

    res.status(200).json({
      status: 'upvoted',
      data: {
        blogPost: action,
      },
    });
  } catch (err) {
    next(err);
  }
};
