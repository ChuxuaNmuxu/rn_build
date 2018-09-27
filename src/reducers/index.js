import { combineReducers } from 'redux';
import routes from './routes';
import config from './config';
import problemOverviewReducer from './problemOverviewReducer';
import doHomeworkReducer from './doHomeworkReducer';
import recordDetailReducer from './recordDetailReducer';

export default combineReducers({
  routes,
  config,
  // ???
  problemOverviewReducer,
  // 做作业
  doHomeworkReducer,
  // 作业或考试记录
  recordDetailReducer,
});
