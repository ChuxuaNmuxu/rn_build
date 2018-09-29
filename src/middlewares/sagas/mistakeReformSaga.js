import {
  takeLatest, put, fork,
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
  // 提交错误分析
  yield takeLatest('MISTAKE_SUBMIT_ANSWER_ERROR_SUBMIT_RADIO_REQUEST', enhanceSaga(submitRadioSaga));
  // 确认移除错题
  yield takeLatest('MISTAKE_SUBMIT_ANSWER_CORRECT_CONFIRM_REQUEST', enhanceSaga(confirmDeleteSaga));
}

function* fetchDataSaga(action) {
  try {
    // console.log(action);
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // yield call(delay, 10000);// 模拟异步 1秒延迟
    // 模拟数据
    const code = 0;
    const result = [
      {
        type: 11,
        answer: null,
        url: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
        controlComponent: {
          showSubmitBtn: false,
          showCorrectInfo: {
            showAll: false,
            showAnswer: false,
            showConfirm: false,
          },
          showErrorInfo: {
            showAll: false,
            showWord: true,
            showRadio: false,
          },
          showSubjectiveInfo: {
            urlSource: {},
            showAll: false,
            otherStudentAnswer: [],
            teacherAnswer: '',
            showTrueOrFalseButton: true,
          },
        },
      },
      {
        type: 1,
        answer: null,
        url: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
        controlComponent: {
          showSubmitBtn: false,
          showCorrectInfo: {
            showAll: false,
            showAnswer: false,
            showConfirm: false,
          },
          showErrorInfo: {
            showAll: false,
            showWord: true,
            showRadio: false,
          },
          showSubjectiveInfo: {
            urlSource: {},
            showAll: false,
            otherStudentAnswer: [],
            teacherAnswer: '',
            showTrueOrFalseButton: true,
          },
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
    const { item: { type } } = action.payload;
    if (type === 1) {
      yield fork(type1Saga, action);
    }
    if (type === 11) {
      yield fork(type11Saga, action);
    }
  } catch (e) {
    yield put(actions.submitAnswerAction(e, 'ERROR'));
  }
}

function* submitRadioSaga(action) {
  try {
    const { index, value } = action.payload;
    // console.log(action);
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // yield call(delay, 100);// 模拟异步 1秒延迟
    // 模拟数据
    const code = 0;
    // console.warn('年级接口res=', res)
    if (code === 0) {
      yield put(actions.submitRadioAction({ value, index }, 'SUCCESS'));
    } else {
      yield put(actions.submitRadioAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.submitRadioAction(e, 'ERROR'));
  }
}
function* confirmDeleteSaga(action) {
  try {
    const { index, callback } = action.payload;
    // console.log(action);
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // yield call(delay, 100);// 模拟异步 1秒延迟
    // 模拟数据
    const code = 0;
    // console.warn('年级接口res=', res)
    if (code === 0) {
      yield put(actions.correctConfirmAction({ index }, 'SUCCESS')); // 目前没做什么操作
      // 成功后的回调
      callback();
    } else {
      yield put(actions.correctConfirmAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.correctConfirmAction(e, 'ERROR'));
  }
}

function* type1Saga(action) {
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
      // 如果答案正确，发送正确的action，反之发送错误的action
      if (result) {
        // 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题
        yield put(actions.showCorrectInfoAction({ result, index, showAnswer: true }));
      } else {
        yield put(actions.showWrongInfoAction({ result, index }));
      }
      // 这步是判断是否还要显示提交按钮，因为正确与错误信息显示以后，就不需要再显示提交按钮了
      yield put(actions.selectAnswerAction({ index }));
    } else {
      yield put(actions.submitAnswerAction(code, 'ERROR'));
    }
  } catch (error) {
    yield put(actions.submitAnswerAction(error, 'ERROR'));
  }
}
function* type11Saga(action) {
  // 请求正确答案、别人答案
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
    // console.warn('年级接口res=', res)
    if (code === 0) {
      const teacherAnswer = 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png';
      const otherStudentAnswer = [
        'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
        'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
        'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
      ];
      yield put(actions.fetchSubjectiveAnswerAction(
        {
          index, showAll: true, teacherAnswer, otherStudentAnswer,
        },
        'SUCCESS',
      ));
      // 这步是判断是否还要显示提交按钮，因为正确与错误信息显示以后，就不需要再显示提交按钮了
      yield put(actions.selectAnswerAction({ index }));
    } else {
      yield put(actions.fetchSubjectiveAnswerAction(code, 'ERROR'));
    }
  } catch (error) {
    yield put(actions.fetchSubjectiveAnswerAction(error, 'ERROR'));
  }
}
