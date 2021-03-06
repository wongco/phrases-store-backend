process.env.NODE_ENV = 'test';

const APIError = require('../../models/ApiError');

describe('API Error Class constructor', () => {
  it('should throw error correctly', async () => {
    try {
      throw new APIError('No!', 404);
    } catch (error) {
      expect(error).toHaveProperty('message', 'No!');
      expect(error).toHaveProperty('status', 404);
    }
  });

  it('should throw generic data correctly', async () => {
    try {
      throw new APIError();
    } catch (error) {
      expect(error).toHaveProperty('message', 'Internal Server Error');
      expect(error).toHaveProperty('status', 500);
    }
  });
});
