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

exports.likeBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await blogService.likeBlog({ blogId, userId: req.user._id });
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

exports.upVote = async (req, res, next) => {};
