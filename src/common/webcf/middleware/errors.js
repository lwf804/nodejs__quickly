import ValidateError from '../../exceptions/ValidateError';

export default (req, res, next) => {
  res.locals.errors = new ValidateError();
  next();
};
