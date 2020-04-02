import http from 'http';
import conf from 'nconf';

import { routeError } from '../lib/errors';

import getAssets from '../../views/assets';

import HTTP_STATUS_CODES from '../constants/httpStatusCodes';

const NODE_ENV = conf.get('NODE_ENV');
const CLIENT_ASSETS = getAssets();

export function handleNotFoundError(req, res) {
  res.redirect(HTTP_STATUS_CODES.FOUND, '/notfound');
}

function renderHTML(res, status, errorDetails) {
  return () => {
    res.status(status).render('error.ejs', {
      ...errorDetails,
      ...CLIENT_ASSETS,
      env: NODE_ENV,
      localData: {
        config: {
          error: true,
        },
      },
    });
  };
}

function renderJSON(res, status, errorDetails) {
  return () => {
    res.status(status).json({
      errors: [errorDetails],
    });
  };
}

// error handler in express has to have four arguments in signature
// eslint-disable-next-line no-unused-vars
export function handleServerError(err, req, res, next) {
  routeError(err, req, res);

  const status = err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  const statusDefinition = http.STATUS_CODES[status];
  const message = err.message || statusDefinition;
  const stack = NODE_ENV !== 'production' ? err.stack : '';

  const errorDetails = {
    status,
    statusDefinition,
    message,
    stack,
  };

  const resHTML = renderHTML(res, status, errorDetails);
  const resJSON = renderJSON(res, status, errorDetails);

  res.format({
    default: resHTML,
    html: resHTML,
    json: resJSON,
    text: resJSON,
  });
}
