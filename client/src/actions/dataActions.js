import * as api from '../api';

import hookActionFactory from './hookActionFactory';

export const GET_TABLES_ACTION = {
  GET_TABLES_REQUEST: 'GET_TABLES_REQUEST',
  GET_TABLES_SUCCESS: 'GET_TABLES_SUCCESS',
  GET_TABLES_ERROR: 'GET_TABLES_ERROR',
};

export function getTables() {
  return dispatch => {
    dispatch({
      type: GET_TABLES_ACTION.GET_TABLES_REQUEST,
    });

    return api
      .getTables()
      .then(res =>
        dispatch({
          type: GET_TABLES_ACTION.GET_TABLES_SUCCESS,
          payload: {
            data: res.data,
          },
        })
      )
      .catch(err => {
        console.error(err);

        dispatch({
          type: GET_TABLES_ACTION.GET_TABLES_ERROR,
          payload: {
            error: err?.response?.data?.error,
          },
        });
      });
  };
}
export const useGetTables = hookActionFactory(getTables);

export const GET_TABLE_DATA_ACTION = {
  GET_TABLE_DATA_REQUEST: 'GET_TABLE_DATA_REQUEST',
  GET_TABLE_DATA_SUCCESS: 'GET_TABLE_DATA_SUCCESS',
  GET_TABLE_DATA_ERROR: 'GET_TABLE_DATA_ERROR',
};

export function getTableData(tableName) {
  return dispatch => {
    dispatch({
      type: GET_TABLE_DATA_ACTION.GET_TABLE_DATA_REQUEST,
      payload: {
        tableName,
      },
    });

    return api
      .getTableData(tableName)
      .then(res =>
        dispatch({
          type: GET_TABLE_DATA_ACTION.GET_TABLE_DATA_SUCCESS,
          payload: {
            tableName,
            data: res.data,
          },
        })
      )
      .catch(err => {
        console.error(err);

        dispatch({
          type: GET_TABLE_DATA_ACTION.GET_TABLE_DATA_ERROR,
          payload: {
            tableName,
            error: err?.response?.data?.error,
          },
        });
      });
  };
}
export const useGetTableData = hookActionFactory(getTableData);

export const SORT_TABLE_DATA_ACTION = 'SORT_TABLE_DATA_ACTION';

export function sortTableData(tableName, column, direction) {
  return {
    type: SORT_TABLE_DATA_ACTION,
    payload: {
      tableName,
      column,
      direction,
    },
  };
}

export const useSortTableData = hookActionFactory(sortTableData);
