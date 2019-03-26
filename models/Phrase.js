const db = require('../db');
const { MAX_PHRASE_LIMIT } = require('../config');

/** Phrase DB Model */
class Phrase {
  /**
   * @description - gets list of phrases from the database - latest to oldest
   * @property {number} limit - numer of items to limit to
   * @property {number} page - pagination option
   * @return {Promise <[ { id, text, createdat }, ... ]>}
   */
  static async getPhrases({ page = 0, limit = MAX_PHRASE_LIMIT }) {
    const result = await db.query(
      'SELECT * FROM phrases ORDER BY createdat DESC OFFSET $1 LIMIT $2',
      [page, limit]
    );
    return result.rows;
  }

  /**
   * @description - add new phrase to database
   * @return {Promise { id, text, createdat }>}
   */
  static async addPhrase(text) {
    const result = await db.query(
      'INSERT INTO phrases (text) VALUES ($1) RETURNING id, text, createdat',
      [text]
    );
    return result.rows[0];
  }
}

module.exports = Phrase;
