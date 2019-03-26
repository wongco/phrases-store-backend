// import helper function
const validateJSONSchema = require('../../helpers/validateJSONSchema');

// sample schema validator template
const testSchema = require('../../schemas/testSchema.json');

describe('validateJSONSchema helper function', () => {
  it('validates schema successfully', async () => {
    const result = validateJSONSchema(
      { user: { username: 'bob', password: '123456' } },
      testSchema
    );

    expect(result).toBe(true);
  });

  it('validates fails because of missing input (password)', () => {
    try {
      validateJSONSchema({ user: { username: 'bob' } }, testSchema);
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        "instance.user requires property 'password'"
      );
    }
  });

  it('validates fails because of invalid parameter (cookies)', () => {
    try {
      validateJSONSchema(
        { user: { username: 'bob', password: '123456' }, cookie: 'chocolate' },
        testSchema
      );
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        "instance additionalProperty 'cookie' exists in instance when not allowed"
      );
    }
  });
});
