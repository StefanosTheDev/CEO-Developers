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
    const { id } = req.params; // Get the user ID from URL params
    const { title, content } = req.body; // Destructure the potential update fields

    // Build an updateData object with only the fields that are provided
    const updatedData = {};
    if (title) updatedData.title = title;
    if (content) updatedData.content = content;

    // Call the service to update the Blog
    const updateBlog = await userService.updateBlogByID(id, updatedData);
    res.status(200).json({
      status: 'delete success',
      data: {
        blog: updateBlog,
        admin_id: req.user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBlogByID = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the user ID from URL params
  } catch (err) {
    next(err);
  }
};
exports.blogEngagement = async (req, res, next) => {
  try {
    // for now we can do something like this to test.
    const { blogId } = req.params;
    const { comment, upvote, like } = req.body;

    const type = blogService.checkData({ comment, upvote, like });
    const blog = await blogService.blogEngagement({
      blogId,
      admin_id: req.user._id,
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
