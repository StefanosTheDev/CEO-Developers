const Blog = require('../models/blogModel');
const AppError = require('../error/AppError');
const util = require('../utils/utils');
exports.createBlog = async ({ title, content, authorId }) => {
  const blog = await Blog.create({ title, content, authorId });
  return blog;
};
exports.getAllBlogs = async () => {};

exports.blogEngagement = async ({ blogId, userId }) => {
  // 1) Get Blog By ID
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError('Blog Post Not Found', 404);
  }
  // 2) Check if ID already liked hte post
  const alreadLiked = blog.likes.some((like) => like.userId.equals(userId));

  if (alreadLiked) {
    throw new AppError('User Already Liked Post', 400);
  }

  // Step 3) Add teh user like to the post and save it
  blog.likes.push({ userId });
  await blog.save();
  return blog;
};
