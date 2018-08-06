import { combineReducers } from 'redux';
import {
  TEST,
} from '../actions/constant';
import routes from './routes';

export function test(state, action) {
  switch (action.type) {
    case TEST:
      return { ...state, test: 1 };
    default:
      return { ...state, test: 0 };
  }
}

export default combineReducers({
  test,
  routes,
});
