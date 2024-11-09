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
