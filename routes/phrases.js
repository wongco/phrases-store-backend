const express = require('express');
const router = new express.Router();
const APIError = require('../models/ApiError');
const Phrase = require('../models/Phrase');
const validateJSONSchema = require('../helpers/validateJSONSchema');
const addPhraseSchema = require('../schemas/addPhraseSchema.json');

/** Base Route /phrases */

/** GET - /phrases
 * @description get a list of phrases from the database
 * @param { object } req.query - request query params
 * @param { number } page - pagination option
 * @param { number } limit - limit amount of items to return
 */
router.get('/', async (req, res, next) => {
  try {
    const { page = 0, limit = 25 } = req.query;
    const phrases = await Phrase.getPhrases({ page, limit });
    return res.json({
      phrases
    });
  } catch (error) {
    const err = new APIError(
      'Resource is currently unavailable, please try again later',
      500
    );
    return next(err);
  }
});

/** POST - /phrases
 * @description: adds a new phrase to the database
 * @param { object } req.body - request body
 * @param { object } req.body.phrase - phrase object
 * @param { string } req.body.phrase.text - new phrase text to add
 */
router.post('/', async (req, res, next) => {
  try {
    validateJSONSchema(req.body, addPhraseSchema);
  } catch (error) {
    return next(error);
  }

  try {
    const { text } = req.body.phrase;
    const phrase = await Phrase.addPhrase(text);
    return res.json({
      phrase,
      message: 'Successfully added!'
    });
  } catch (error) {
    const err = new APIError(
      'Resource is currently unavailable, please try again later',
      500
    );
    return next(err);
  }
});

// exports router for app.js use
module.exports = router;
