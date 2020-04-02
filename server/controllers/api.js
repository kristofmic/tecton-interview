import { serverLogger as logger } from '../lib/logger';
import { HttpError, UnexpectedServerError } from '../lib/errors';

import HTTP_STATUS_CODES from '../constants/httpStatusCodes';

import * as data from '../lib/services/data';

const ERROR_CODE = {
  UNKNOWN: 'API:ERROR:100',

  INVALID_TABLE_NAME: 'API:ERROR:101',
};

export async function getTables(req, res, next) {
  try {
    const tables = await data.getTables();

    res.status(HTTP_STATUS_CODES.OK).json(tables);
  } catch (error) {
    logger.error(error);

    return next(new UnexpectedServerError(ERROR_CODE.UNKNOWN));
  }
}

export async function getTableData(req, res, next) {
  const { name } = req.params;

  try {
    const tables = await data.getTables();
    const table = tables.find(t => t.name === name);

    if (!table) {
      return next(
        new HttpError(
          `Table name ${name} not recognized`,
          HTTP_STATUS_CODES.BAD_REQUEST,
          ERROR_CODE.INVALID_TABLE_NAME
        )
      );
    }

    const tableData = await data.getCsvData(table.url);

    res.status(HTTP_STATUS_CODES.OK).json(tableData);
  } catch (error) {
    logger.error(error);

    return next(new UnexpectedServerError(ERROR_CODE.UNKNOWN));
  }
}
