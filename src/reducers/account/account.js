import createReducer from '../createReducer';
import { SET_USER_INFO } from '../../constants/actionType';
import * as fn from './fn';

const initial = {};

const handle = {
  [SET_USER_INFO]: fn.setUserInfo,
};

const account = createReducer(initial, handle);
export default account;
