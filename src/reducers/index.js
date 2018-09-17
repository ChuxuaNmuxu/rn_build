import { combineReducers } from 'redux';
import routes from './routes';
import config from './config';
import problemOverviewReducer from './problemOverviewReducer';
import doHomeworkReducer from './doHomeworkReducer';

export default combineReducers({
  routes,
  config,
  // ???
  problemOverviewReducer,
  // 做作业
  doHomeworkReducer,
});
