import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 做作业数据
  data: {},
};

const handle = {
  // 成功请求到做作业数据
  FETCH_DOHOMEWORK_QUESTION_SUCCESS: fn.fetchDataSuccess,
};

const doHomeworkReducer = createReducer(initState, handle);

export default doHomeworkReducer;
