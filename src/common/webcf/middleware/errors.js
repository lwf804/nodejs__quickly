import ValidateError from '@common/exceptions/ValidateError';

export default (req, res, next) => {
  res.locals.errors = new ValidateError();
  next();
};
