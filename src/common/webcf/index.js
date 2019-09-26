import { static as expstatic } from 'express';
import { normalize } from 'path';
import methodOverride from 'method-override';
import session from 'express-session';
import { ejs as getViewEngine } from './viewEngine';
import webRoutes from '@http/web/routes';
import { projectPath, secretKey } from '@config/app';
import { getViewsPath } from '@utils/path';
import { errors, auth, csrf } from './middleware';
import { sessionStore } from '@common/database';

const viewsPath = getViewsPath();
const viewEngine = getViewEngine(viewsPath);

export default app => {
  // static public
  app.use(expstatic(normalize(`${projectPath}/public`)));

  // config session
  app.use(
    session({
      secret: secretKey,
      proxy: true,
      resave: true,
      saveUninitialized: true,
      store: sessionStore(session),
    })
  );

  // config auth
  app.use(auth);

  // config csrf
  app.use(csrf);

  // config view
  app.engine(viewEngine.engineName, viewEngine.engine);
  app.set('view engine', viewEngine.engineName);
  app.set('views', viewsPath);

  // override method (post => put or delete)
  app.use(
    methodOverride(function(req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  // routes
  app.use(webRoutes);

  // middleware (after route)
  app.use(errors);
};
