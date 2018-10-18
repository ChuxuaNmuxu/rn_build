import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 错题
  mistakeList: [],
};

const handle = {
  FETCH_MISTAKE_LIST_SUCCESS: fn.getMistakeList,
  ADD_MISTAKE_LIST_SUCCESS: fn.addMistakeList,
  // FETCH_INCORRECT_PROPBLEM_DETAIL_ERROR: fn.getIncorrectInfo,
};

export default createReducer(initState, handle);
