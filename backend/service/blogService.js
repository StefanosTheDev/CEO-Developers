const Blog = require('../models/blogModel');
const AppError = require('../error/AppError');

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
  const blogs = await Blog.findOne({}); // get all blogs
  if (!blogs) {
    throw new AppError('No blogs exist');
  }
  return blogs;
};
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
