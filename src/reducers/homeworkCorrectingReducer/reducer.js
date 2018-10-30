import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  list: [],
};

const handle = {
  // 获取list成功了
  FETCH_HOMEWORK_CORRECTING_LIST_SUCCESS: fn.fetchListSuccess,
  // 设置批阅分数
  HOMEWORK_CORRECTING_SET_SCORE: fn.setScore,
  // 控制完成按钮
  HOMEWORK_CORRECTING_CONTROL_FINISH_BTN: fn.controlFinishBtn,
};

export default createReducer(initState, handle);
