import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 错题
  mistakeList: [],
  total: 0,
  controlFetch: false, // ????????
};

const handle = {
  FETCH_MISTAKE_LIST_SUCCESS: fn.getMistakeListSuccess,
  ADD_MISTAKE_LIST_SUCCESS: fn.addMistakeList,
  control: fn.control,
  HOMEWORK_PROBLEM_DETAIL_INNITAIL_LIST: fn.initList,
};

export default createReducer(initState, handle);
