import { createLogger, format, transports } from 'winston';
import moment from 'moment';
import { projectPath, isProd } from '@config/app';

const MESSAGE = Symbol.for('message');

const options = {
  file: {
    filename: `${projectPath}/storage/logs/app.log`,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: format((log, opts) => {
      log[MESSAGE] = `[${log.level.toUpperCase()}::${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] ${log.message}\n`;
      return log;
    })(),
  },
};

const logger = new createLogger({
  transports: [new transports.File(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});

if (!isProd) {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

const superError = logger.error;
logger.error = error => {
  switch (typeof error) {
    case 'string':
      return superError(error);

    case 'object':
      if (error instanceof Error) {
        return superError(error.stack);
      }
      return superError(JSON.stringify(error));

    default:
      return;
  }
};

export default logger;
