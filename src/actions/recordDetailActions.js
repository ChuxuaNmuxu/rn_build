// 获取考试或者作业记录
import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchExaminationData = actionCreator(types.FETCH_RECORD_DETAIL_EXAM, '考试或者作业页面--请求考试数据--全部返回');
export const fetchHomeworkListData = actionCreator(
  types.FETCH_RECORD_DETAIL_HOMEWORK_LIST,
  '考试或者作业页面--请求作业数据--作业题号list请求',
);
export const fetchHomeworkData = actionCreator(types.FETCH_RECORD_DETAIL_HOMEWORK, '考试或者作业页面--请求作业数据--单次请求');
