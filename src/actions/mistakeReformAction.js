import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchDataAction = actionCreator(types.FETCH_MISTAKE, '错题重做-请求错题');
export const showWrongInfoAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER_ERROR, '错题重做-显示错误答案提示');
export const showWrongInfoRadioAction = actionCreator(
  types.MISTAKE_SUBMIT_ANSWER_ERROR_SHOW_RADIO,
  '错题重做-点击错题总结显示Radio',
);
export const submitRadioAction = actionCreator(
  types.MISTAKE_SUBMIT_ANSWER_ERROR_SUBMIT_RADIO,
  '错题重做-点击错题总结Radio提交给后台',
);
export const selectAnswerAction = actionCreator(types.MISTAKE_SELECT_ANSWER, '错题重做-选择了答案，判断是否显示提交的按钮');
export const submitAnswerAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER, '错题重做-提交答案，判断对错');
export const showCorrectInfoAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER_CORRECT, '错题重做-显示正确答案提示');
export const correctConfirmAction = actionCreator(
  types.MISTAKE_SUBMIT_ANSWER_CORRECT_CONFIRM,
  '错题重做-点击正确答案的提交确认框',
);
export const updateImageAction = actionCreator(types.MISTAKE_UPLOAD_IMAGE, '错题重做-点击主观题上传图片，控制提交按钮');
