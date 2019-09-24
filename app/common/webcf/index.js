import { static as expstatic } from 'express';
import { normalize } from 'path';
import hbs from './hbs';
import webRoutes from '../../http/web/routes';
import { projectPath } from '../../config/app';
import { getViewsPath } from '../../utils/path';

const viewsPath = getViewsPath();

export default app => {
  // static public
  app.use(expstatic(normalize(`${projectPath}/public`)));

  // config view
  app.engine('hbs', hbs(viewsPath));
  app.set('view engine', 'hbs');
  app.set('views', viewsPath);

  // routes
  app.use(webRoutes);
};
