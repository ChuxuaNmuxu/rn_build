import { combineReducers } from 'redux';
import routes from './common/routes';
import config from './common/config';
import problemOverviewReducer from './problemOverviewReducer';
import previewHomeworkReducer from './previewHomeworkReducer';
import doHomeworkReducer from './doHomeworkReducer';
import homeworkTaskReducer from './HomeworkTask';
import recordDetailReducer from './recordDetailReducer';
import mistakeReformReducer from './mistakeReformReducer';
import ProblemRecordsReducer from './problemRecordsReducer';
import taskDetailReducer from './taskDetailReducer';
import homeworkCorrectingReducer from './homeworkCorrectingReducer';


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
});
