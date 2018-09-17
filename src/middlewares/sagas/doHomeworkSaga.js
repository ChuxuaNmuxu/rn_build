import {
  takeLatest, put,
} from 'redux-saga/effects';
// import api from '../../utils/fetch';
import * as actions from '../../actions/doHomeworkAction';
import enhanceSaga from './enhanceSaga';

export default function* doHomeworkSaga() {
  // 请求错题本
  yield takeLatest('FETCH_DOHOMEWORK_QUESTION_REQUEST', enhanceSaga(fetchDoHomeworkSaga));
}

function* fetchDoHomeworkSaga(action) {
  try {
    console.log(action);
    // const url = '/student/homeworks/491188981451456512?optType=2';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
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
        answer: '单选题答案',
      }, {
        number: 2,
        id: 2,
        type: 2,
        read: false,
        optionCount: 4,
        difficultyLevel: null,
        content: '多选题内容',
        answer: '多选题答案',
      }, {
        number: 3,
        id: 3,
        type: 3,
        read: false,
        optionCount: 4,
        difficultyLevel: null,
        content: '判断题内容',
        answer: '判断题答案',
      }, {
        number: 4,
        id: 4,
        type: 4,
        read: false,
        optionCount: 4,
        difficultyLevel: null,
        content: '对应题内容',
        answer: '对应题答案',
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
