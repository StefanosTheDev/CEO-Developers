// Validation middleware (you can move this to a separate file if preferred)
exports.validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.validatedBody = validatedData;
      next();
    } catch (err) {
      return res.status(400).json({
        status: 'fail',
        errors: err.errors.map((e) => e.message),
      });
    }
  };
};
