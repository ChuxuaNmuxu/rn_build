import React from 'react';
import {
  takeLatest, put, call,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Text } from 'react-native';
import { ModalApi } from '../../components/Modal';
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
    const fetch = arg => api.get(url, arg);
    const res = yield call(fetch, params);
    const { code, data } = res;
    console.log(888881, res);
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
    const { code, message } = res;
    // console.log('检查作业是否可做返回数据', res);
    if (code === 0) {
      Actions.DoHomework({ homeworkId });
      yield put(actions.checkHomeworkAction(code, 'SUCCESS'));
    } else if (code === 42001) {
      const data = {
        tipsContent: <Text>这份作业已过截止提交时间，无法继续作答</Text>,
        bottomTips: 's自动关闭',
      };
      ModalApi.onOppen('TipsModal', data);
      Actions.HomeworkTask();
      yield call(delay, 2000);
      yield put(actions.checkHomeworkAction(code, 'ERROR'));
    } else if (code === 42005) {
      const data = {
        tipsContent: <Text>教师已取消布置本作业</Text>,
        bottomTips: 's自动关闭',
      };
      ModalApi.onOppen('TipsModal', data);
      Actions.HomeworkTask();
      yield call(delay, 2000);
      yield put(actions.checkHomeworkAction(code, 'ERROR'));
    } else {
      const data = {
        tipsContent: <Text>{message}</Text>,
        bottomTips: 's自动关闭',
      };
      ModalApi.onOppen('TipsModal', data);
      Actions.HomeworkTask();
      yield call(delay, 2000);
      yield put(actions.checkHomeworkAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.checkHomeworkAction(e, 'ERROR'));
  }
}
