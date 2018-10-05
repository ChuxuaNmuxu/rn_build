import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 科目
  subjectData: [],
  // 记录数据
  recordData: [],
  // 年级
  allGradeData: [],
  // 批改状态
  recordStateData: [],
  // 修正状态
  isRevisingData: [],
};

const handle = {
  // 做题记录-初始化请求
  FETCH_PROBLEM_RECORDS_INITIAL_FETCH_SUCCESS: fn.fetchInitailDataSuccess,
  // 下拉刷新哒哒哒
  FETCH_PROBLEM_RECORDS_DROP_DOWN_REFRESH_DATA_SUCCESS: fn.fetchDropDownRefreshDataSuccess,
  //  参数变化
  FETCH_PROBLEM_RECORDS_CHANGE_PARAMS_REFRESH_DATA_SUCCESS: fn.fetchChangeParamsRefreshDataSuccess,
};

const problemRecordsReduecer = createReducer(initState, handle);

export default problemRecordsReduecer;
