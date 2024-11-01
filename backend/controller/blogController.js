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
