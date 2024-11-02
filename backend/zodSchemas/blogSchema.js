// schemas/blogSchemas.js

const { z } = require('zod');

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

module.exports = {
  blogSchema,
};
