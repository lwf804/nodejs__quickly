export default (req, res, next) => {
  res.locals._method = method => `<input type="hidden" name="_method" value="${method}">`;
  next();
};
