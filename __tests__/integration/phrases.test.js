/** Integration tests for phrase routes */
process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../../app');
const db = require('../../db');
const Phrase = require('../../models/Phrase');

beforeEach(async () => {
  // delete all data from table and add two new stock entries
  await db.query('DELETE FROM phrases');

  await Phrase.addPhrase('First phrase!');
  await Phrase.addPhrase('Second phrase!');
});

describe('GET /phrases', () => {
  it('getting list of phrases succeeded without query string options', async () => {
    const apiResponse = await request(app).get('/phrases');

    const { phrases } = apiResponse.body;
    expect(Array.isArray(phrases)).toBe(true);

    const latestPhrase = phrases[0];
    expect(phrases).toHaveLength(2);
    expect(latestPhrase).toHaveProperty('id');
    expect(latestPhrase).toHaveProperty('text', 'Second phrase!');
    expect(latestPhrase).toHaveProperty('createdat');
  });
});

describe('POST /phrases', () => {
  it('adding a new phrase succeeds', async () => {
    const userSentRequestBody = {
      phrase: {
        text: 'New phrase!'
      }
    };
    const apiResponse = await request(app)
      .post('/phrases')
      .send(userSentRequestBody);

    const { phrase } = apiResponse.body;
    expect(phrase).toHaveProperty('id');
    expect(phrase).toHaveProperty('text', 'New phrase!');
    expect(phrase).toHaveProperty('createdat');

    // check entry is reflected in updated get request
    const apiResponseUpdated = await request(app).get('/phrases');
    const { phrases } = apiResponseUpdated.body;
    expect(phrases).toHaveLength(3);

    const latestPhrase = phrases[0];
    expect(latestPhrase).toHaveProperty(
      'text',
      userSentRequestBody.phrase.text
    );
  });
});

afterAll(async function() {
  // close db connection
  await db.end();
});
