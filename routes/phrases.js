const express = require('express');
const router = new express.Router();
const APIError = require('../models/ApiError');

/** Base Route /phrases */

/** GET - /phrases
 * @description get a list of phrases from the database
 * @param { object } req.query - request query params
 * @param { number } page - pagination option
 * @param { number } limit - limit amount of items to return
 */
router.get('/', (req, res, next) => {
  // make request to api and get results
  // return data with message

  return res.json({
    message: 'get route!'
  });
});

/** POST - /phrases
 * @description: adds a new phrase to the database
 * @param { object } req.body - request body
 * @param { string } req.body.text - new phrase text to add
 */
router.post('/', (req, res, next) => {
  // make request to api and confirm add
  // return data with message

  return res.json({
    message: 'post route!'
  });
});

// exports router for app.js use
module.exports = router;
