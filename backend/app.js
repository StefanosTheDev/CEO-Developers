const express = require('express');
const morgan = require('morgan');
const authRouter = require('../backend/routes/authRoutes');
const errorHandling = require('./middleware/errorHandling');
const AppError = require('./error/AppError');
const blogRouter = require('../backend/routes/blogRoutes');
const helmet = require('helmet');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(helmet());
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);
// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});
app.use(errorHandling);

module.exports = app;
