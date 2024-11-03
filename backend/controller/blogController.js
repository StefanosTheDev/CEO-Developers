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
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateBlogByID = async (req, res, next) => {};
exports.getBlogByID = async (req, res, next) => {};

exports.blogEngagement = async (req, res, next) => {
  try {
    // for now we can do something like this to test.
    const { blogId } = req.params;
    const { comment, upvote, like } = req.body;

    const type = blogService.checkData({ comment, upvote, like });
    const blog = await blogService.blogEngagement({
      blogId,
      userId: req.user._id,
      type,
    });

    res.status(200).json({
      status: 'success',
      data: {
        blogPost: blog,
      },
    });
  } catch (err) {
    next(err);
  }
};
