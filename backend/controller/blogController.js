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

// Create a functio that can handle either Like, Upvote or Comment
// From there pass that into the
exports.likeBlog = async (req, res, next) => {
  try {
    // for now we can do something like this to test.
    const { blogId } = req.params;
    const { comment, upvote, like } = req.body;
    const checkBody = await blog.service.sanatizeBody({});
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
