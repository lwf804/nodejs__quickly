import exphbs from 'express-handlebars';
import { normalize } from 'path';
import hbsHelpers from 'handlebars-helpers';

// merge to custom helpers
const customHelpers = {};
const helpers = Object.assign(hbsHelpers(), customHelpers);

export default viewsPath => {
  return exphbs.create({
    helpers,
    extname: 'hbs',
    layoutsDir: normalize(`${viewsPath}/_layouts`),
    partialsDir: normalize(`${viewsPath}/_partials`),
    defaultLayout: 'main',
  }).engine;
};
