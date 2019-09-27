import * as RegisterService from '@services/web/auth/register';

export function show(req, res) {
  res.render('auth/register', { user: {} });
}

export function register(req, res, next) {
  const user = req.body;
  if (!res.locals.errors.isEmpty()) {
    return res.render('auth/register', { user });
  }

  RegisterService.register(user, req)
    .then(() => res.redirect('/login'))
    .catch(() => next());
}
