const { validate } = require('jsonschema');
const APIError = require('../models/ApiError');

/** runs the validation module from jsonschema and throws error with causes */
function validateJSONSchema(reqData, schema) {
  const schemaValidation = validate(reqData, schema);

  if (!schemaValidation.valid) {
    // parse errorArray and clean out output for JSON response
    const errMessageArray = schemaValidation.errors.map(error =>
      error.stack.split('"').join("'")
    );
    const message = errMessageArray.join('; ');
    const status = 400;
    const error = new APIError(message, status);
    throw error;
  }

  return true;
}

module.exports = validateJSONSchema;
