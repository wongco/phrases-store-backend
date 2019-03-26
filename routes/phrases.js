const express = require('express');
const router = new express.Router();
const APIError = require('../models/ApiError');

/** Base Route /phrases */

/** GET - /phrases
 * desc: get a list of phrases from the database
 */
router.get('/', (req, res, next) => {
  return res.json({
    message: 'get route!'
  });
});

/** POST - /phrases
 * desc: adds a new phrase to the database
 */
router.post('/', (req, res, next) => {
  return res.json({
    message: 'post route!'
  });
});

// exports router for app.js use
module.exports = router;
