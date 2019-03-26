const db = require('../db');

// class models
const APIError = require('./ApiError');

/** User on the site */

class Phrases {
  /**
   * @description - gets list of phrases from the database
   * @property {number} limit - numer of items to limit to
   * @property {number} page - pagination option
   * @return {Promise <[ { id, text}, ... ]>}
   */
  static async getPhrases({ page, limit }) {
    // make db call to postgres and obtain data
  }

  /**
   * @description - add new phrase to database
   * @property {number} limit - numer of items to limit to
   * @property {number} page - pagination option
   * @return {Promise <[ { id, text}, ... ]>}
   */
  static async addPhrase(text) {
    // make db call to postgres and insert text
  }
}

module.exports = Phrases;
