import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 错题
  problems: {},
};

const handle = {
  FETCH_INCORRECT_PROPBLEM_DETAIL_SUCCESS: fn.getIncorrectInfo,
  // FETCH_INCORRECT_PROPBLEM_DETAIL_ERROR: fn.getIncorrectInfo,
};

export default createReducer(initState, handle);
