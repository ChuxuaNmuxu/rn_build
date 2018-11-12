import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchHotReportAction = actionCreator(types.FETCH_HOTREPORT_DATA, '请求战绩热报的数据');
