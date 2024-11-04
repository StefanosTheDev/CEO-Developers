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

module.exports = {
  authSchema,
};
