const { z } = require('zod');
const { validateEmail } = require('../utils/utils');
const authSchema = z
  .object({
    username: z
      .string({ required_error: 'Username Is Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' }),

    password: z
      .string({ required_error: 'Password Required' })
      .min(6, { message: 'Password minimum must be 6' })
      .max(12, { message: 'Password maximum must be 12' }),

    role: z.enum(['admin', 'user']).optional(), // Specify allowed roles here

    email: z
      .string({ required_error: 'Email is Required' })
      .email({ message: 'Invalid email format' })
      .refine(async (email) => {
        console.log('Refine function called', email);
        return await validateEmail(email);
      }),
  })
  .strict({ message: 'There is an Invalid Field in The Request Body' });

const loginSchema = z
  .object({
    password: z
      .string({ required_error: 'Password Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' }),

    email: z
      .string({ required_error: 'Email is Required' })
      .email({ message: 'Invalid email format' })
      .refine(async (email) => {
        console.log('Refine function called', email);
        return await validateEmail(email);
      }),
  })
  .strict({ message: 'There is an Invalid Field in The Request Body' });

// Define your schema for role validation
const isAdminSchema = z.object({
  role: z.enum(['admin']),
});

const updateSchema = z
  .object({
    id: z.string().optional(),
    username: z
      .string({ required_error: 'Username Is Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' })
      .optional(),

    password: z
      .string({ required_error: 'Password Required' })
      .min(6, { message: 'Username minimum must be 6' })
      .max(12, { message: 'Username maximum must be 12' })
      .optional(),

    role: z.enum(['admin', 'user']).optional(), // Specify allowed roles here

    email: z
      .string({ required_error: 'Email is Required' })
      .email({ message: 'Invalid email format' })
      .refine(async (email) => {
        console.log('Refine function called', email);
        return await validateEmail(email);
      })
      .optional(),
  })

  .strict({ message: 'There is an Invalid Field in The Request Body' });

const idOnlySchema = z
  .object({
    id: z.string({ required_error: 'ID is required' }),
  })
  .strict({ message: 'There is an Invalid Field in The Request Param' });
module.exports = {
  authSchema,
  loginSchema,
  isAdminSchema,
  updateSchema,
  idOnlySchema,
};
