import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  list: [],
};

const handle = {
  // 获取list成功了
  FETCH_HOMEWORK_CORRECTING_LIST_SUCCESS: fn.fetchListSuccess,
};

export default createReducer(initState, handle);
