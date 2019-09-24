import logger from '../logger';
import { isProd } from '../../config/app';
import { resJson } from '../../utils/request';
import JsonResponse from '../components/JsonResponse';

export default (error, res, req) => {
  logger.error(error);

  // handle for kind of exception

  return lastHandle(error, res, req);
};

const lastHandle = (error, res, req) => {
  const err = {
    status: error.status || 500,
    message: error.message || req.__('An error occurred'),
    ...(isProd ? {} : error),
  };

  if (resJson(req)) {
    const resObj = JsonResponse.error(error);
    return res.status(resObj.statusCode).json(resObj.get(isProd));
  }

  res.locals.error = err;

  // render the error page
  res.status(err.status).render('errors/error');
};
