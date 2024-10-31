const express = require('express');
const morgan = require('morgan');
const authRouter = require('../backend/routes/authRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // Why do this
app.use('/api/auth', authRouter);

module.exports = app;
