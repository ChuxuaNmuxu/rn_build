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
            g: '',
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
  MISTAKE_SUBMIT_ANSWER_ERROR_RADIO: fn.showAnswerErrorRadio,
};

const problemOverviewReducer = createReducer(initState, handle);

export default problemOverviewReducer;
