/** Common config */

// read .env files and make environmental variables
require('dotenv').config();

let DB_URI = process.env.DATABASE_URL || 'postgresql:///phrases-store';

// test db uri
if (process.env.NODE_ENV === 'test') {
  DB_URI = 'postgresql:///phrases-store-test';
}

const PORT = process.env.PORT || 5000;
const MAX_PHRASE_LIMIT = process.env.MAX_PHRASE_LIMIT || 25;

module.exports = {
  DB_URI,
  PORT,
  MAX_PHRASE_LIMIT
};
