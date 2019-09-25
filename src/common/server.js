import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import logger from '@common/logger';
import { requestLimit } from '@config/app';
import errorHandler from '@common/exceptions/handler';
import i18n from './i18n';
import { connect } from './database';

class Server {
  constructor(app = express()) {
    this.app = app;

    // connect db
    connect()
      .on('error', logger.error)
      .on('disconnected', connect);

    // compression (should be placed before express.static)
    app.use(
      compression({
        threshold: 512,
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

    // cookie parser
    app.use(cookieParser());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false, limit: requestLimit }));

    // parse application/json
    app.use(bodyParser.json({ limit: requestLimit }));

    // add i18n
    app.use(i18n);

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
