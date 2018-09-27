import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 错题本数据
  data: [],
};

const handle = {
  // 请求错题本成功了
  FETCH_PROBLEM_OVERVIEW_SUCCESS: fn.fetchDataSuccess,
};

const problemOverviewReducer = createReducer(initState, handle);

export default problemOverviewReducer;
