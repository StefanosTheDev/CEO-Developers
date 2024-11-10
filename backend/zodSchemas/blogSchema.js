const { z } = require('zod');

const blogSchema = z
  .object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(5, { message: 'Title must be at least 5 characters' })
      .max(15, { message: 'Title cannot exceed 15 characters' }),
    content: z
      .string({ required_error: 'Content is required' })
      .min(20, { message: 'Content cannot be empty' })
      .max(500, { message: 'Content cannot exceed 500 characters' }),
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

const deleteBlogSchema = z.object({
  id: z.string({ required_error: 'ID is required for deletion' }),
});

const commentSchema = z.object({
  id: z.string({ required_error: 'BLOG ID is required for comment' }),
  message: z
    .string({ required_error: 'Cannot Post Blank Comment' })
    .max(200, { message: 'Content cannot exceed 200 characters' }),
});
module.exports = {
  blogSchema,
  updateBlogSchema,
  deleteBlogSchema,
  commentSchema,
};
