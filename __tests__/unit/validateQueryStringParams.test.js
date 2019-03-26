const {
  validateQueryStringParams
} = require('../../middleware/validateQueryStringParams');
const { MAX_PHRASE_LIMIT } = require('../../config');

// mock response and next arguments
const mockResponse = undefined;
const mockNext = err => {
  if (err) {
    return err;
  }
};

describe('validateQueryStringParams', () => {
  it('validates normal values sucessfully', () => {
    let mockRequest = {
      query: {
        limit: 2,
        page: 2
      }
    };

    const middlewareResponse = validateQueryStringParams(
      mockRequest,
      mockResponse,
      mockNext
    );
    expect(middlewareResponse).toBe(undefined);

    const { limit, page } = mockRequest.query;
    expect(limit).toBe(2);
    expect(page).toBe(2);
  });

  it('errors out with incorrect query string params', () => {
    let mockRequest = {
      query: {
        limit: 'bob'
      }
    };

    const middlewareResponse = validateQueryStringParams(
      mockRequest,
      mockResponse,
      mockNext
    );
    expect(middlewareResponse.message).toBe(
      'Invalid query parameters, please check values'
    );
  });

  it('corrects out of range query string params', () => {
    let mockRequest = {
      query: {
        limit: MAX_PHRASE_LIMIT + 200,
        page: -20
      }
    };

    const middlewareResponse = validateQueryStringParams(
      mockRequest,
      mockResponse,
      mockNext
    );
    expect(middlewareResponse).toBe(undefined);

    const { limit, page } = mockRequest.query;
    expect(limit).toBe(MAX_PHRASE_LIMIT);
    expect(page).toBe(0);
  });
});
