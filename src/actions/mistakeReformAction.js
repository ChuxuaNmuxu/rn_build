import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const saveQuestionsAction = actionCreator(types.SAVE_QUESTIONS, '错题重做-保存且修改上游传过来的数据');
export const showWrongInfoAction = actionCreator(types.MISTAKE_SUBMIT_ANSWER_ERROR, '错题重做-显示错误答案提示');
export const showWrongInfoRadioAction = actionCreator(
  types.MISTAKE_SUBMIT_ANSWER_ERROR_SHOW_RADIO,
  '错题重做-显示错题总结的Radio',
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
export const fetchSubjectiveAnswerAction = actionCreator(
  types.MISTAKE_CHANGE_SUBJECTIVE_SHOWALL,
  '错题重做-主观题-点击提交按钮获取老师答案、别人的答案',
);
export const controlSubjectiveButtonAction = actionCreator(
  types.MISTAKE_CHANGE_SUBJECTIVE_SHOWBUTTON,
  '错题重做-主观题-点击那个错误的按钮，把这一行隐藏掉',
);
