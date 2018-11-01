import React from 'react';
import {
  takeLatest, put, call,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Text } from 'react-native';
import { ModalApi } from '../../components/Modal';
import * as actions from '../../actions/previewHomeworkAction';
import enhanceSaga from './enhanceSaga';

export default function* previewHomeworkSaga() {
  // 请求预览作业页面的题目数据
  yield takeLatest('FETCH_PREVIEWHOMEWORK_QUESTION_REQUEST', enhanceSaga(fetchPreviewHomeworkSaga));
  yield takeLatest('CHECK_HOMEWORK_ISOPERABLE_REQUEST', enhanceSaga(checkHomeworkStatusSaga));
}

// 请求作业数据---optType(操作类型  1:预览 2:作答)---请求数据失败时应该提示并跳回首页
function* fetchPreviewHomeworkSaga(action) {
  try {
    const { homeworkId } = action.payload;
    // console.log(8888, '作业id', homeworkId);
    const params = {};
    params.optType = 1;
    const url = `app/api/student/homeworks/${homeworkId}`;
    const fetch = arg => Fetch.get(url, arg);
    const res = yield call(fetch, params);
    const { code, data, message } = res;
    if (code === 0) {
      yield put(actions.fetchPreviewHomeworkAction(data, 'SUCCESS'));
    } else {
      const datas = {
        tipsContent: <Text>{message}</Text>,
        bottomTips: 's自动关闭',
      };
      ModalApi.onOppen('TipsModal', datas);
      Actions.replace('HomeworkTask');
      // Actions.HomeworkTask();
      yield call(delay, 2000);
      yield put(actions.fetchPreviewHomeworkAction(code, 'ERROR'));
    }
  } catch (e) {
    // console.log(222222222, '报错啦');
    const datas = {
      tipsContent: <Text>请求接口数据失败!</Text>,
      bottomTips: 's自动关闭',
    };
    ModalApi.onOppen('TipsModal', datas);
    Actions.replace('HomeworkTask');
    // Actions.HomeworkTask();
    yield call(delay, 2000);
    yield put(actions.fetchPreviewHomeworkAction(e, 'ERROR'));
  }
}

// 检查作业是否可做---开始做作业之前都要先请求此接口
function* checkHomeworkStatusSaga(action) {
  try {
    const { homeworkId } = action.payload;
    const url = `app/api/student/homeworks/${homeworkId}/start`;
    const fetch = arg => Fetch.post(url, arg);
    const res = yield call(fetch);
    const { code, message } = res;
    // console.log('检查作业是否可做返回数据', res);
    if (code === 0) {
      // 作业状态正常，则跳到做作业页面
      Actions.replace('DoHomework', { homeworkId });
      // Actions.DoHomework({ homeworkId });
      yield put(actions.checkHomeworkStatusAction(code, 'SUCCESS'));
    } else if (code === 42001) {
      const data = {
        tipsContent: <Text>这份作业已过截止提交时间，无法继续作答</Text>,
        bottomTips: 's自动关闭',
      };
      ModalApi.onOppen('TipsModal', data);
      Actions.replace('HomeworkTask');
      // Actions.HomeworkTask();
      yield call(delay, 2000);
      yield put(actions.checkHomeworkStatusAction(code, 'ERROR'));
    } else if (code === 42005) {
      const data = {
        tipsContent: <Text>教师已取消布置本作业</Text>,
        bottomTips: 's自动关闭',
      };
      ModalApi.onOppen('TipsModal', data);
      Actions.replace('HomeworkTask');
      // Actions.HomeworkTask();
      yield call(delay, 2000);
      yield put(actions.checkHomeworkStatusAction(code, 'ERROR'));
    } else {
      const data = {
        tipsContent: <Text>{message}</Text>,
        bottomTips: 's自动关闭',
      };
      ModalApi.onOppen('TipsModal', data);
      Actions.replace('HomeworkTask');
      // Actions.HomeworkTask();
      yield call(delay, 2000);
      yield put(actions.checkHomeworkStatusAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.checkHomeworkStatusAction(e, 'ERROR'));
  }
}
