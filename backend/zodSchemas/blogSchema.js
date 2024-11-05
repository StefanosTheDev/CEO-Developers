const { z } = require('zod');

const blogSchema = z
  .object({
    title: z
      .string({ required_error: 'Title is required' })
      .max(10, { message: 'Title cannot exceed 10 characters' }),
    content: z
      .string({ required_error: 'Content is required' })
      .min(1, { message: 'Content cannot be empty' }),
  })
  .strict({ message: 'Unexpected field in the request body' });

module.exports = {
  blogSchema,
};
