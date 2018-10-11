import {
  takeLatest, put,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
// import api from '../../utils/fetch';
import * as actions from '../../actions/doHomeworkAction';
import enhanceSaga from './enhanceSaga';

export default function* doHomeworkSaga() {
  // 请求做作业页面的题目数据
  yield takeLatest('FETCH_DOHOMEWORK_QUESTION_REQUEST', enhanceSaga(fetchDoHomeworkSaga));
  // 提交答题数据
  yield takeLatest('SUBMIT_DOHOMEWORK_ANSWER', enhanceSaga(submitDoHomeworkAnswerSaga));
}

// 请求作业数据---optType(操作类型  1:预览 2:作答)
function* fetchDoHomeworkSaga(action) {
  try {
    console.log(11178, action);
    // const { homeworkId } = action.payload;
    // const params = {};
    // params.optType = 2;
    // const url = 'app/api/student/homeworks/' + homeworkId';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data } = res;
    // 模拟数据
    const code = 0;
    const data = {
      cost: 0,
      homeworkId: '1234',
      lastNumber: 0,
      previewed: false,
      questionList: [{
        number: 1,
        id: 1,
        type: 1,
        read: false,
        optionCount: 4,
        difficultyLevel: null,
        content: '单选题内容',
        answer: 'A',
      }, {
        number: 2,
        id: 2,
        type: 2,
        read: false,
        optionCount: 4,
        difficultyLevel: null,
        content: '多选题内容',
        answer: 'AB',
      }, {
        number: 3,
        id: 3,
        type: 3,
        read: false,
        optionCount: 4,
        difficultyLevel: null,
        content: '判断题内容',
        answer: '1',
      }, {
        number: 4,
        id: 4,
        type: 4,
        read: false,
        optionCount: 4,
        difficultyLevel: null,
        content: '对应题内容',
        answer: '1A2B3C4D',
      }, {
        number: 5,
        id: 5,
        type: 10,
        read: false,
        optionCount: 4,
        difficultyLevel: null,
        content: '填空题内容',
        answer: '填空题答案',
      }],
    };
    if (code === 0) {
      yield put(actions.fetchdoHomeworkAction(data, 'SUCCESS'));
    } else {
      yield put(actions.fetchdoHomeworkAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchdoHomeworkAction(e, 'ERROR'));
  }
}

// 提交所做题目的答案数据
function* submitDoHomeworkAnswerSaga(action) {
  try {
    console.log(action);
    // const {homeworkId, questionId, answerParam} = action.payload;
    // const url = '/student/homeworks/' + homeworkId + '/questions/' + questionId + '/answer';
    // const fetch = (params) => api.put(url, answerParam);
    // const res = yield call(fetch);
    // const { code } = res;
    const code = 0;
    if (code === 0) {
      yield put(actions.submitDoHomeworkAnswerAction(code, 'SUCCESS'));
    } else {
      yield put(actions.submitDoHomeworkAnswerAction(code, 'ERROR'));
    }
  } catch (error) {
    yield put(actions.submitDoHomeworkAnswerAction(error, 'ERROR'));
  }
}
