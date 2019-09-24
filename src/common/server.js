import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import logger from '../common/logger';
import { requestLimit } from '../config/app';
import errorHandler from '../common/exceptions/handler';

class Server {
  constructor(app = express()) {
    this.app = app;

    // compression
    app.use(
      compression({
        filter: (req, res) => {
          if (req.headers['x-no-compression']) {
            return false;
          }
          return compression.filter(req, res);
        },
      })
    );

    // helmet security
    app.use(helmet());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false, limit: requestLimit }));

    // parse application/json
    app.use(bodyParser.json({ limit: requestLimit }));

    // request logger
    // app.use(morgan('combined', { stream: logger.stream }));

    // error handler
    app.use(function(err, req, res, next) {
      errorHandler(err, req, res);
    });
  }

  // config for app
  config(cf) {
    cf(this.app);
    return this;
  }

  // start server
  start(port) {
    this.app.listen(port, () => {
      logger.info(`Server start at port: ${port}`);
    });
  }
}

export default new Server();
