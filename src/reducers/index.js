import { combineReducers } from 'redux';
import routes from './common/routes';
import config from './common/config';
import problemOverviewReducer from './problemOverviewReducer';
import doHomeworkReducer from './doHomeworkReducer';
import homeworkTaskReducer from './HomeworkTask';
import recordDetailReducer from './recordDetailReducer';
import mistakeReformReducer from './mistakeReformReducer';

export default combineReducers({
  routes,
  config,
  // 错题本
  problemOverviewReducer,
  // 做作业
  doHomeworkReducer,
  // 任务计划
  homeworkTaskReducer,
  // 作业或考试记录
  recordDetailReducer,
  // 错题重做
  mistakeReformReducer,
});
