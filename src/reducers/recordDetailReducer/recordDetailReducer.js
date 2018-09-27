import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 考试和作业的数据，本质上是一样的。尽管作业的接口是需要点一个去请求一次。
  // 思路为，作业假如存在数据则不请求，不存在反之。考试的话直接拿缓存起来的数据，每次点击模拟请求返回。
  headerList: [],
  detailsDataList: [],
};

const handle = {
  // 请求考试页面（头部和内容一起返回）
  FETCH_RECORD_DETAIL_EXAM_SUCCESS: fn.fetchExamDataSuccess,
  // 请求作业记录头部数据
  FETCH_RECORD_DETAIL_HOMEWORK_LIST_SUCCESS: fn.fetchHomeworkListDataSuccess,
  // 请求作业记录内容数据（点一次请求一次系列）
  FETCH_RECORD_DETAIL_HOMEWORK_SUCCESS: fn.fetchHomeworkDataSuccess,
};

const problemOverviewReducer = createReducer(initState, handle);

export default problemOverviewReducer;
