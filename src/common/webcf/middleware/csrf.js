import csrf from 'csurf';

const csrfToken = (req, res, next) => {
  res.locals.csrf_token = req.csrfToken();
  res.locals.csrf_input = `<input type="hidden" name="_csrf" value="${req.csrfToken()}">`;
  next();
};

export default [csrf(), csrfToken];
