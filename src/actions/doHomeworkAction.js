// 做作业页面的相关操作
import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchdoHomeworkAction = actionCreator(types.FETCH_DOHOMEWORK_QUESTION, '请求做作业页面的数据');

export const submitDoHomeworkAnswerAction = actionCreator(types.SUBMIT_DOHOMEWORK_ANSWER, '提交所做题目的答案');
