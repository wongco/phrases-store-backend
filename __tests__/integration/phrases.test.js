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
  await Phrase.addPhrase('Third phrase!');
});

describe('GET /phrases', () => {
  it('getting list of phrases succeeded without query string options', async () => {
    const apiResponse = await request(app).get('/phrases');

    const { phrases } = apiResponse.body;
    expect(apiResponse).toHaveProperty('status', 200);
    expect(Array.isArray(phrases)).toBe(true);

    const latestPhrase = phrases[0];
    expect(phrases).toHaveLength(3);
    expect(latestPhrase).toHaveProperty('id');
    expect(latestPhrase).toHaveProperty('text', 'Third phrase!');
    expect(latestPhrase).toHaveProperty('createdat');
  });

  it('getting list of phrases succeeded with query string options', async () => {
    const apiResponse = await request(app)
      .get('/phrases')
      .query({ limit: 2, page: 1 });

    const { phrases } = apiResponse.body;

    const latestPhraseAtPageOne = phrases[0];
    expect(apiResponse).toHaveProperty('status', 200);
    expect(phrases).toHaveLength(2);
    expect(latestPhraseAtPageOne).toHaveProperty('id');
    expect(latestPhraseAtPageOne).toHaveProperty('text', 'Second phrase!');
    expect(latestPhraseAtPageOne).toHaveProperty('createdat');
  });

  it('providing invalid query string params should return error', async () => {
    const apiResponse = await request(app)
      .get('/phrases')
      .query({ limit: 'bob' });

    const { message } = apiResponse.body.error;
    expect(apiResponse.status).toBe(400);
    expect(message).toEqual('Invalid query parameters, please check values');
  });

  it('providing out of range query params should be ignored', async () => {
    const apiResponse = await request(app)
      .get('/phrases')
      .query({ limit: 200, page: -10 });

    const { phrases } = apiResponse.body;

    expect(apiResponse).toHaveProperty('status', 200);
    expect(phrases).toHaveLength(3);
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
    expect(apiResponse).toHaveProperty('status', 200);
    expect(phrase).toHaveProperty('id');
    expect(phrase).toHaveProperty('text', 'New phrase!');
    expect(phrase).toHaveProperty('createdat');

    // check entry is reflected in updated get request
    const apiResponseUpdated = await request(app).get('/phrases');
    const { phrases } = apiResponseUpdated.body;
    expect(phrases).toHaveLength(4);

    const latestPhrase = phrases[0];
    expect(latestPhrase).toHaveProperty(
      'text',
      userSentRequestBody.phrase.text
    );
  });

  it('submitting invalid request body returns validation error', async () => {
    const userSentRequestBody = {
      phrase: {
        favPhrase: 'New phrase!'
      }
    };
    const apiResponse = await request(app)
      .post('/phrases')
      .send(userSentRequestBody);

    const { message } = apiResponse.body.error;
    expect(apiResponse.status).toBe(400);
    expect(message).toMatch(/favPhrase/);
  });
});

afterAll(async function() {
  // close db connection
  await db.end();
});
