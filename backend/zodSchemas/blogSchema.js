const { z } = require('zod');

const blogSchema = z
  .object({
    id: z.string().optional(),
    title: z
      .string({ required_error: 'Title is required' })
      .max(10, { message: 'Title cannot exceed 10 characters' }),
    content: z
      .string({ required_error: 'Content is required' })
      .min(1, { message: 'Content cannot be empty' }),
  })
  .strict({ message: 'Unexpected field in the request body' });

const updateBlogSchema = z
  .object({
    // Require `id` for all update operations
    id: z.string({ required_error: 'ID is required for updates' }),

    // `title` and `content` are optional, allowing flexibility in partial updates
    title: z
      .string({ required_error: 'Title is required' })
      .max(10, { message: 'Title cannot exceed 10 characters' })
      .optional(),

    content: z
      .string({ required_error: 'Content is required' })
      .min(1, { message: 'Content cannot be empty' })
      .optional(),
  })
  .strict({ message: 'Unexpected field in the request body' })
  .refine((data) => data.title || data.content, {
    message: 'At least one of title or content must be provided for an update',
  });

module.exports = {
  blogSchema,
  updateBlogSchema,
};
