import * as _helpers from './_helpers';

export const helpers = _helpers;

export default (req, res, next) => {
  res.locals = {
    ...res.locals,
    ..._helpers,
  };

  next();
};
