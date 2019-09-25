import i18n from 'i18n';
import { getResourcesPath } from '../utils/path';

const opts = {
  locales: ['ja', 'en'],
  defaultLocale: 'en',
  directory: getResourcesPath('locales'),
  autoReload: true,
  updateFiles: false,
  cookie: 'lang',
};

i18n.configure(opts);

const defaultLang = (req, res, next) => {
  let locate = null;
  if (!req.cookies[opts.cookie] || opts.locales.indexOf(req.cookies[opts.cookie]) === -1) {
    locate = opts.defaultLocale;
    res.cookie(opts.cookie, locate, { maxAge: 10800, httpOnly: true });
  } else {
    locate = req.cookies[opts.cookie];
  }
  res.setLocale(locate);

  next();
};

export default [i18n.init, defaultLang];
