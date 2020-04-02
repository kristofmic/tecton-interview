import set from 'lodash/fp/set';
import update from 'lodash/fp/update';

import reducerFactory from './reducerFactory';

import {
  GET_TABLES_ACTION,
  GET_TABLE_DATA_ACTION,
  SORT_TABLE_DATA_ACTION,
} from '../actions/dataActions';

import { API_STATUS } from '../api/apiStatus';

const initialState = {
  tables: {
    data: undefined,
    error: undefined,
    status: undefined,
  },
  tableData: {
    /**
     * [tableName]: {
     *    data: Object,
     *    error: Error,
     *    status: API_STATUS,
     *    sort: {
     *      column: String
     *      direction: asc|desc
     *    }
     * }
     */
  },
};

const handlers = {
  [GET_TABLES_ACTION.GET_TABLES_REQUEST](state) {
    const nextTables = {
      data: undefined,
      error: undefined,
      status: API_STATUS.LOADING,
    };

    return set(['tables'], nextTables, state);
  },

  [GET_TABLES_ACTION.GET_TABLES_SUCCESS](state, action) {
    const { data } = action.payload;

    return update(
      ['tables'],
      prevState => {
        return {
          ...prevState,
          data,
          status: API_STATUS.SUCCESS,
        };
      },
      state
    );
  },

  [GET_TABLES_ACTION.GET_TABLES_ERROR](state, action) {
    const { error } = action.payload;

    return update(
      ['tables'],
      prevState => ({
        ...prevState,
        error,
        status: API_STATUS.ERROR,
      }),
      state
    );
  },

  [GET_TABLE_DATA_ACTION.GET_TABLE_DATA_REQUEST](state, action) {
    const { tableName } = action.payload;

    const nextTableData = {
      data: undefined,
      error: undefined,
      status: API_STATUS.LOADING,
    };

    return set(['tableData', tableName], nextTableData, state);
  },

  [GET_TABLE_DATA_ACTION.GET_TABLE_DATA_SUCCESS](state, action) {
    const { data, tableName } = action.payload;

    return update(
      ['tableData', tableName],
      prevState => {
        return {
          ...prevState,
          data,
          status: API_STATUS.SUCCESS,
        };
      },
      state
    );
  },

  [GET_TABLE_DATA_ACTION.GET_TABLE_DATA_ERROR](state, action) {
    const { error, tableName } = action.payload;

    return update(
      ['tableData', tableName],
      prevState => ({
        ...prevState,
        error,
        status: API_STATUS.ERROR,
      }),
      state
    );
  },

  [SORT_TABLE_DATA_ACTION](state, action) {
    const { column, direction, tableName } = action.payload;
    const nextRows = [...state.tableData[tableName].data.rows];

    nextRows.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (aVal === bVal) {
        return 0;
      }

      let delta = aVal < bVal;

      if (direction === 'desc') {
        delta = !delta;
      }

      return delta ? -1 : 1;
    });

    let nextState = set(
      ['tableData', tableName, 'sort'],
      {
        column,
        direction,
      },
      state
    );
    nextState = set(['tableData', tableName, 'data', 'rows'], nextRows, nextState);
    return nextState;
  },
};

const dataReducer = reducerFactory(initialState, handlers);
export default dataReducer;
