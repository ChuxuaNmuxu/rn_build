import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchDataAction = actionCreator(types.FETCH_MISTAKE, '错题重做-请求错题');
export const selectAnswerAction = actionCreator(types.MISTAKE_SELECT_ANSWER, '错题重做-选择了答案，所以要显示提交的按钮');
export const submitAnswerAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER, '错题重做-提交答案，判断对错');
