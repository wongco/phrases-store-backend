/** jest tests for phrase class */
process.env.NODE_ENV = 'test';

const Phrase = require('../../models/Phrase');
const db = require('../../db');

beforeEach(async () => {
  await db.query('DELETE FROM phrases');
  await db.query('INSERT INTO phrases (text) VALUES ($1)', [
    'First Phrase Entry'
  ]);
  await db.query('INSERT INTO phrases (text) VALUES ($1)', [
    'Second Phrase Entry'
  ]);
  await db.query('INSERT INTO phrases (text) VALUES ($1)', [
    'Third Phrase Entry'
  ]);
  await db.query('INSERT INTO phrases (text) VALUES ($1)', ['Four!']);
});

describe('getPhrases method', () => {
  it('getting phrases with no default request options succeeds', async () => {
    const requestOptions = {};
    const result = await Phrase.getPhrases(requestOptions);
    expect(result).toHaveLength(4);
  });

  it('getting phrases with a limit should return correct number of entries', async () => {
    const result = await Phrase.getPhrases({ limit: 2 });
    expect(result).toHaveLength(2);
  });

  it('getting phrases with a limit and page returns correct results', async () => {
    const result = await Phrase.getPhrases({ page: 2, limit: 2 });
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('text', 'Second Phrase Entry');
    expect(result[1]).toHaveProperty('text', 'First Phrase Entry');
  });
});

describe('addPhrase method', () => {
  // if('adding a phrase ')
});

afterAll(async function() {
  // close db connection
  await db.end();
});
