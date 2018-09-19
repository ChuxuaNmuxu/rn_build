import { combineReducers } from 'redux';
import routes from './common/routes';
import config from './common/config';
import problemOverviewReducer from './problemOverviewReducer';
import doHomeworkReducer from './doHomeworkReducer';

export default combineReducers({
  routes,
  config,
  problemOverviewReducer,
  // 做作业
  doHomeworkReducer,
});
