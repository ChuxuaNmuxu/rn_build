import {
  takeLatest, put, call,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import api from '../../utils/fetch';
import * as actions from '../../actions/previewHomeworkAction';
import enhanceSaga from './enhanceSaga';

export default function* previewHomeworkSaga() {
  // 请求预览作业页面的题目数据
  yield takeLatest('FETCH_PREVIEWHOMEWORK_QUESTION_REQUEST', enhanceSaga(fetchPreviewHomeworkSaga));
  yield takeLatest('CHECK_HOMEWORK_ISOPERABLE_REQUEST', enhanceSaga(checkHomeworkSaga));
}

// 请求作业数据---optType(操作类型  1:预览 2:作答)
function* fetchPreviewHomeworkSaga(action) {
  try {
    const { homeworkId } = action.payload;
    const params = {};
    params.optType = 1;
    const url = `app/api/student/homeworks/${homeworkId}`;
    const fetch = (arg) => api.get(url, arg);
    const res = yield call(fetch, params);
    const { code, data } = res;
    // console.log(666661, action);
    console.log(888881, res);
    // 模拟数据
    if (code === 0) {
      yield put(actions.fetchPreviewHomeworkAction(data, 'SUCCESS'));
    } else {
      yield put(actions.fetchPreviewHomeworkAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchPreviewHomeworkAction(e, 'ERROR'));
  }
}

// 检查作业
function* checkHomeworkSaga(action) {
  try {
    const { homeworkId } = action.payload;
    const url = `app/api/student/homeworks/${homeworkId}/start`;
    const fetch = params => api.post(url, params);
    const res = yield call(fetch);
    const { code } = res;
    if (code === 0) {
      yield put(actions.checkHomeworkAction(code, 'SUCCESS'));
    } else {
      yield put(actions.checkHomeworkAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.checkHomeworkAction(e, 'ERROR'));
  }
}
