import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  myIndexData: {},
};

const handle = {
  FETCH_MYINDEX_DATA_SUCCESS: fn.getMyIndexDataSuccess,
};

export default createReducer(initState, handle);
