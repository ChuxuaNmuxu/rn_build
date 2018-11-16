import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  hotReportData: [],
};

const handle = {
  FETCH_HOTREPORT_DATA_SUCCESS: fn.getHotReportDataSuccess,
};

export default createReducer(initState, handle);
