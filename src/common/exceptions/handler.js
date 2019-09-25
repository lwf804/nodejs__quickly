import logger from '../logger';
import { isProd } from '../../config/app';
import { resJson } from '../../utils/request';
import JsonResponse from '../components/JsonResponse';

export default (error, req, res) => {
  logger.error(error.stack);

  // handle for kind of exception

  return lastHandle(error, res, req);
};

const lastHandle = (error, res, req) => {
  const err = {
    status: error.status || 500,
    message: error.message || res.__('an_error_occurred'),
    ...(isProd ? {} : error),
  };

  if (resJson(req)) {
    const resObj = JsonResponse.error(error);
    return res.status(resObj.statusCode).json(resObj.get(isProd));
  }

  res.locals.message = err.message;
  res.locals.error = error.stack;

  // render the error page
  res.status(err.status).render('errors/error');
};
