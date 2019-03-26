/** use test database as specified in config.js */
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
  it('setting no default request options succeeds', async () => {
    const requestOptions = {};
    const result = await Phrase.getPhrases(requestOptions);

    expect(result).toHaveLength(4);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('text');
    expect(result[0]).toHaveProperty('createdat');
  });

  it('setting a limit should return correct number of entries', async () => {
    const result = await Phrase.getPhrases({ limit: 2 });

    expect(result).toHaveLength(2);
  });

  it('setting a limit and pagination option returns correct results', async () => {
    const result = await Phrase.getPhrases({ page: 2, limit: 2 });

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('text', 'Second Phrase Entry');
    expect(result[1]).toHaveProperty('text', 'First Phrase Entry');
  });
});

describe('addPhrase method', () => {
  it('adding a new phrase should succeed and return added entry data', async () => {
    const inputPhrase = 'Fifth entry';
    const result = await Phrase.addPhrase(inputPhrase);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('text', inputPhrase);
    expect(result).toHaveProperty('createdat');

    const updatedPhraseList = await Phrase.getPhrases({});
    expect(updatedPhraseList).toHaveLength(5);
  });
});

afterAll(async () => {
  // close db connection
  await db.end();
});
