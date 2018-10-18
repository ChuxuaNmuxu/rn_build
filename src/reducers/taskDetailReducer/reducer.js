import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 执行日期
  beginTime: '今天',
};

const handle = {
  // 提交日期成功了
  PUT_HOMEWORK_DATE_SUCCESS: fn.putDateSuccess,
};

export default createReducer(initState, handle);
