import express from 'express';
import bodyParser from 'body-parser';
import logger from '../common/logger';
import { requestLimit } from '../config/app';

class Server {
  constructor(app = express()) {
    this.app = app;

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false, limit: requestLimit }));

    // parse application/json
    app.use(bodyParser.json({ limit: requestLimit }));
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
