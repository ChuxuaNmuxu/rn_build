import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchDataAction = actionCreator(types.FETCH_MISTAKE, '错题重做-请求错题');
export const selectAnswerAction = actionCreator(types.MISTAKE_SELECT_ANSWER, '错题重做-选择了答案，判断是否显示提交的按钮');
export const submitAnswerAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER, '错题重做-提交答案，判断对错');
export const showCorrectInfoAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER_CORRECT, '错题重做-正确答案');
export const showWrongInfoAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER_ERROR, '错题重做-错误答案');
export const showWrongInfoRadioAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER_ERROR_RADIO, '错题重做-点击错题总结显示Radio');
