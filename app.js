/** Express app */
const express = require('express');
const app = express();
const cors = require('cors');
const APIError = require('./models/ApiError');

// don't provide http logging during automated tests and production
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

// middleware for parsing req.body and json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const phrasesRoute = require('./routes/phrases');
app.use('/phrases', cors(), phrasesRoute);

/** 404 handler */
app.use(cors(), (req, res, next) => {
  const err = new APIError(`${req.url} is not a valid path to a API resource.`);
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */
app.use(cors(), (err, req, res, next) => {
  // all errors that get to here get coerced into API Errors
  if (!(err instanceof APIError)) {
    err = new APIError(err.message, err.status);
  }
  return res.status(err.status).json(err);
});

module.exports = app;
