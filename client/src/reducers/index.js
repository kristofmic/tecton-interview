import { combineReducers } from 'redux';

import dataReducer from './dataReducer';

export const stateShape = {
  data: 'data',
};

const reducer = combineReducers({
  [stateShape.data]: dataReducer,
});

export default reducer;
