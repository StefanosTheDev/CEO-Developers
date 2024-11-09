const Blog = require('../models/blogModel');
const AppError = require('../error/AppError');
const mongoose = require('mongoose');
exports.createBlog = async ({ title, content, authorId }) => {
  // Check if Blog exist with same title
  const existingBlog = await Blog.findOne({ title });
  if (existingBlog) {
    throw new AppError('A blog with this title already exists', 400);
  }
  const blog = await Blog.create({ title, content, authorId });
  return blog;
};
exports.getAllBlogs = async () => {
  // Query All Blogs
  const blogs = await Blog.find({}); // get all blogs
  if (!blogs) {
    throw new AppError('No blogs exist');
  }
  return blogs;
};
exports.updateBlogByID = async ({ id }, { title, content }) => {
  const updatedData = {};

  if (title) updatedData.title = title;
  if (content) updatedData.content = content;

  const blog = await Blog.findByIdAndUpdate(id, updatedData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation for updated fields
  });

  if (!blog) {
    throw new Error('Blog not found'); // Handle Blog not found case
  }

  return blog;
};
exports.getBlogByID = async ({ id }) => {
  const blog = Blog.findById(id);
  if (!blog) {
    throw new AppError('Blog Not Found');
  }
  return blog;
};
exports.deleteBlogByID = async ({ id }) => {
  const delBlog = await Blog.findByIdAndDelete(id);
  if (!delBlog) {
    throw new AppError('User Not Found');
  }
  return delBlog;
};
exports.likes_or_upvotes = async (user_id, { id }, type) => {
  // Validate that user_id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    throw new AppError('Invalid User ID', 400);
  }

  // Fetch the blog post
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError('Blog Post Not Found', 404);
  }

  if (type === 'likes') {
    // Check if the user has already liked the post
    const alreadyLiked = blog.likes.some((like) => {
      return like.userId && like.userId.equals(user_id);
    });

    if (alreadyLiked) {
      throw new AppError('User Already Liked Post', 400);
    }

    // Add the user ID to the likes array
    blog.likes.push({ userId: user_id });
    await blog.save();
    return blog;
  }

  if (type === 'upvotes') {
    // Check if the user has already upvoted the post
    const alreadyUpvoted = blog.upvotes.some((upvote) => {
      return upvote.userId && upvote.userId.equals(user_id);
    });

    if (alreadyUpvoted) {
      throw new AppError('User Already Upvoted Post', 400);
    }

    // Add the user ID to the upvotes array
    blog.upvotes.push({ userId: user_id });
    await blog.save();
    return blog;
  }

  // Handle invalid action types
  throw new AppError('Invalid action type', 400);
};
