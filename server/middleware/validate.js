// middleware/validate.js
import { validationResult } from 'express-validator';
import { AppError } from './error.js';

export const validate = (validations) => {
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
