import { static as expstatic } from 'express';
import { normalize } from 'path';
import { ejs as getViewEngine } from './viewEngine';
import webRoutes from '../../http/web/routes';
import { projectPath } from '../../config/app';
import { getViewsPath } from '../../utils/path';
import { errors } from './middleware';

const viewsPath = getViewsPath();
const viewEngine = getViewEngine(viewsPath);

export default app => {
  // static public
  app.use(expstatic(normalize(`${projectPath}/public`)));

  // config view
  app.engine(viewEngine.engineName, viewEngine.engine);
  app.set('view engine', viewEngine.engineName);
  app.set('views', viewsPath);

  // middleware
  app.use(errors);

  // routes
  app.use(webRoutes);
};
