const { z } = require('zod');

const authSchema = z.object({
  username: z
    .string({ required_error: 'Username Is Required' })
    .min(6, { message: 'Username minimum must be 6' })
    .max(12, { message: 'Username maximum must be 12' }),

  email: z
    .string({ required_error: 'Email is Required' })
    .regex({}) // Regex Check Email
    .strict({ message: 'There is an Invalid Field in The Request Body' }),
});
module.exports = {
  authSchema,
};
