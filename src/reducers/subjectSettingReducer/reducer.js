import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  subjectList: [],
};

const handle = {
  FETCH_SUBJECT_DATA_LIST_SUCCESS: fn.getSubjectDataListSuccess,
};

export default createReducer(initState, handle);
