import { combineReducers } from 'redux';
import routes from './routes';
import config from './config';
import problemOverviewReducer from './problemOverviewReducer';


export default combineReducers({
  routes,
  config,
  // ???
  problemOverviewReducer,
});
