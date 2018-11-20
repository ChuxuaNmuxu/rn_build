import { combineReducers } from 'redux';
import routes from './common/routes';
import config from './common/config';
import problemOverviewReducer from './problemOverviewReducer';
import previewHomeworkReducer from './previewHomeworkReducer';
import doHomeworkReducer from './doHomeworkReducer';
import homeworkTaskReducer from './homeworkTask';
import recordDetailReducer from './recordDetailReducer';
import mistakeReformReducer from './mistakeReformReducer';
import ProblemRecordsReducer from './problemRecordsReducer';
import taskDetailReducer from './taskDetailReducer';
import homeworkCorrectingReducer from './homeworkCorrectingReducer';
import incorrectProblemDetail from './incorrectProblemDetail';
import mistakeListReducer from './mistakeList';
import hotReportReducer from './hotReportReducer';
import myIndexReducer from './myIndexReducer';
import subjectSettingReducer from './subjectSettingReducer';
import rankBoardReducer from './rankBoardReducer';
import personalInformationReducer from './personalInformationReducer';
import account from './account';
import detailsHonor from './detailsHonor';

export default combineReducers({
  routes,
  config,
  // 错题本
  problemOverviewReducer,
  // 作业预览
  previewHomeworkReducer,
  // 做作业
  doHomeworkReducer,
  // 任务计划
  homeworkTaskReducer,
  // 作业或考试记录
  recordDetailReducer,
  // 错题重做
  mistakeReformReducer,
  // 做题记录
  ProblemRecordsReducer,
  // 任务详情
  taskDetailReducer,
  // 作业批阅
  homeworkCorrectingReducer,
  // 错题详情
  incorrectProblemDetail,
  // 错题列表
  mistakeListReducer,
  // 战绩热报
  hotReportReducer,
  // 我的 页面
  myIndexReducer,
  // 竞争科目设置
  subjectSettingReducer,
  // 排行榜
  rankBoardReducer,
  // 个人信息
  personalInformationReducer,
  // 账号信息
  account,
  /**
 * 荣誉详情包含
 * 积分、挑战次数、团队奉献度
 */
  detailsHonor,
});
