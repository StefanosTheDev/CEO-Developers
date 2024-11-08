// middleware/validationMiddleware.js

const { z } = require('zod');
const AppError = require('../error/AppError');

exports.validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedData = await schema.parseAsync(req.body);
      req.validatedBody = validatedData;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Map Zod errors to a format suitable for AppError
        const errors = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        // Create a new AppError with the validation errors
        return next(new AppError('Validation failed', 400, errors));
      }
      // Pass any other errors to the next middleware
      next(err);
    }
  };
};

exports.validateRole = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.user); // Validate req.user against the provided schema
      next(); // If validation passes, proceed
    } catch (error) {
      return next(new AppError('Unauthorized. Only Admin Have access', 400));
    }
  };
};
