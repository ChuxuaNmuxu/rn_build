import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 错题
  questions: [],
  test: {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: [
        {
          f: {
            g: '变化前',
          },
        },
      ],
    },
  },
};

const handle = {
  // 请求错题本成功了
  FETCH_MISTAKE_SUCCESS: fn.fetchDataSuccess,
  MISTAKE_SELECT_ANSWER: fn.selectAnswer,
  MISTAKE_SUBMIT_ANSWER_CORRECT: fn.answerCorrect,
  MISTAKE_SUBMIT_ANSWER_ERROR: fn.answerError,
  MISTAKE_SUBMIT_ANSWER_ERROR_SHOW_RADIO: fn.showAnswerErrorRadio,
  MISTAKE_UPLOAD_IMAGE: fn.updateImage,
};

const problemOverviewReducer = createReducer(initState, handle);

export default problemOverviewReducer;
