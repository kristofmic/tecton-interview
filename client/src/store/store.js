import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import pick from 'lodash/pick';

import reducers, { stateShape } from '../reducers';
import localData from '../utils/localData';

export function createStore(initialState) {
  const _initialState = initialState || localData() || {};

  const store = createReduxStore(
    reducers,
    pick(_initialState, Object.values(stateShape)),
    applyMiddleware(thunk)
  );

  return store;
}
