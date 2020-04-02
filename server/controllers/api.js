import { serverLogger as logger } from '../lib/logger';
import { UnexpectedServerError } from '../lib/errors';

import HTTP_STATUS_CODES from '../constants/httpStatusCodes';

import sleep from '../lib/utils/sleep';

const ERROR_CODE = {
  UNKNOWN: 'API:ERROR:100',
};

export async function ping(req, res, next) {
  try {
    await sleep(1000);

    res.status(HTTP_STATUS_CODES.OK).json('pong');
  } catch (error) {
    logger.error(error);

    return next(new UnexpectedServerError(ERROR_CODE.UNKNOWN));
  }
}
