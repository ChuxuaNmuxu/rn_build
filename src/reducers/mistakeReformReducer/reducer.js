import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 错题
  questions: [

  ],
};

const handle = {
  // 请求错题本成功了
  SAVE_QUESTIONS_SUCCESS: fn.saveQuestions,
  MISTAKE_SELECT_ANSWER: fn.selectAnswer,
  MISTAKE_SUBMIT_ANSWER_CORRECT: fn.answerCorrect,
  MISTAKE_SUBMIT_ANSWER_ERROR: fn.answerError,
  MISTAKE_SUBMIT_ANSWER_ERROR_SHOW_RADIO: fn.showAnswerErrorRadio,
  MISTAKE_UPLOAD_IMAGE: fn.updateImage,
  MISTAKE_CHANGE_SUBJECTIVE_SHOWALL_SUCCESS: fn.changeSubjectiveShowall,
  MISTAKE_CHANGE_SUBJECTIVE_SHOWBUTTON: fn.controlSubjectButton,
};

export default createReducer(initState, handle);
