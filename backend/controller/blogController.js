const blogService = require('../service/blogService');
exports.createBlog = async (req, res, next) => {
  try {
    const newBlogPost = await blogService.createBlog(req.body, req.user.id);
    res.status(201).json({
      status: 'Blog Created',
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
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateBlogByID = async (req, res, next) => {
  try {
    const blog = await blogService.updateBlogByID(req.params, req.body);
    res.status(200).json({
      status: 'Update success',
      data: {
        blog: blog,
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
      status: 'Deleted Blog',
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
      status: 'Retrieved Blog',
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
    const action = await blogService.likes_or_upvotes(
      req.user.id,
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
exports.comment = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const comment = await blogService.comment(req.params, req.body, user_id);
    res.status(200).json({
      status: 'commented',
      data: {
        commentedPost: comment,
      },
    });
  } catch (err) {
    next(err);
  }
};
