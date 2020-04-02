import { combineReducers } from 'redux';

import configReducer from './configReducer';

export const stateShape = {
  config: 'config',
};

const reducer = combineReducers({
  [stateShape.config]: configReducer,
});

export default reducer;
