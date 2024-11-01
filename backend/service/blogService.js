const Blog = require('../models/blogModel');
exports.createBlog = async ({ title, content, authorId }) => {
  const blog = await Blog.create({ title, content, authorId });
  return blog;
};
exports.getAllBlogs = async () => {};
