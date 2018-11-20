import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  data: {},
};

const handle = {
  FETCH_PERSONAL_INFO_SUCCESS: fn.getPersonalInfoSuccess,
};

export default createReducer(initState, handle);
