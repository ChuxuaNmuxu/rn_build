import {
  takeLatest, put,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
// import api from '../../utils/fetch';
import * as actions from '../../actions/mistakeReformAction';
import enhanceSaga from './enhanceSaga';

export default function* mistakeReformSaga() {
  // 请求错题
  yield takeLatest('FETCH_MISTAKE_REQUEST', enhanceSaga(fetchDataSaga));
  // 提交答案，判断对错
  yield takeLatest('MISTAKE_SUBMIT_ANSWER_REQUEST', enhanceSaga(submitAnswerSaga));
}

function* fetchDataSaga(action) {
  try {
    // console.log(action);
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // yield call(delay, 100);// 模拟异步 1秒延迟
    // 模拟数据
    const code = 0;
    const result = [
      {
        type: 1,
        answer: null,
        url: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
        controlComponent: {
          showSubmitBtn: false,
          showCorrectInfo: false,
          showErrorInfo: false,
        },
      },
      {
        type: 2,
        answer: null,
        url: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
        controlComponent: {
          showSubmitBtn: false,
          showCorrectInfo: false,
          showErrorInfo: false,
        },
      },
    ];
    // console.warn('年级接口res=', res)
    if (code === 0) {
      yield put(actions.fetchDataAction(result, 'SUCCESS'));
    } else {
      yield put(actions.fetchDataAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchDataAction(e, 'ERROR'));
  }
}

function* submitAnswerSaga(action) {
  try {
    const { index } = action.payload;
    // console.log(action);
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // yield call(delay, 100);// 模拟异步 1秒延迟
    // 模拟数据
    const code = 0;
    const result = true;
    // console.warn('年级接口res=', res)
    if (code === 0) {
      yield put(actions.submitAnswerAction({ result, index }, 'SUCCESS'));
    } else {
      yield put(actions.submitAnswerAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.submitAnswerAction(e, 'ERROR'));
  }
}
