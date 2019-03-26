/** Common config */

// read .env files and make environmental variables
require('dotenv').config();

// pull db uri from .env or actual ENV
let DB_URI = process.env.DATABASE_URL || 'postgresql:///phrases-store';

// if test environment is active, optimize for performance and convenience
if (process.env.NODE_ENV === 'test') {
  DB_URI = 'postgresql:///phrases-store-test';
}

const PORT = process.env.PORT || 3000;

module.exports = {
  DB_URI,
  PORT
};
