// 获取做作业的数据
import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchdoHomeworkAction = actionCreator(types.FETCH_DOHOMEWORK_QUESTION, '请求做作业页面的数据');
