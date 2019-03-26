const { MAX_PHRASE_LIMIT } = require('../config');
const APIError = require('../models/ApiError');

function validateQueryStringParams(req, res, next) {
  let { page = 0, limit = MAX_PHRASE_LIMIT } = req.query;
  try {
    // coerce and validate query params and clean if needed
    page = +page;
    limit = +limit;
    if (isNaN(page) || isNaN(limit)) {
      throw new Error('Invalid query parameters, please check values');
    }

    // mutate req query strings params if out of range
    req.query.page = page < 0 ? 0 : page;
    req.query.limit =
      limit < MAX_PHRASE_LIMIT && limit > 0 ? limit : MAX_PHRASE_LIMIT;
    return next();
  } catch (error) {
    const err = new APIError(error.message, 400);
    return next(err);
  }
}

module.exports = { validateQueryStringParams };
