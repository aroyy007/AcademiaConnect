const { validationResult } = require('express-validator');
const { AppError } = require('./error');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push(err.msg));

    throw new AppError(extractedErrors.join('. '), 400);
  };
};

module.exports = { validate };