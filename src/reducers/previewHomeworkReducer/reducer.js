import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 预览作业数据
  data: {},
};

const handle = {
  // 成功请求到预览作业数据
  FETCH_PREVIEWHOMEWORK_QUESTION_SUCCESS: fn.fetchDataSuccess,
};

const previewHomeworkReducer = createReducer(initState, handle);

export default previewHomeworkReducer;
