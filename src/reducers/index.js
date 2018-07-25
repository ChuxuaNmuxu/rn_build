import { combineReducers } from 'redux';
import {
  TEST,
} from '../actions/constant';
import routes from './routes';

export function test(state, action) {
  switch (action.type) {
    case TEST:
      return 1;
    default:
      return 0;
  }
}

export default combineReducers({
  test,
  routes,
});
