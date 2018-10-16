import {
  takeLatest, put, call,
} from 'redux-saga/effects';
import R from 'ramda';
import * as actions from '../../actions/homeworkTask';
import * as actionTypes from '../../constants/actionType';
import { createHalfHourPeriod, currentTimeToPeriod } from '../../utils/common';
import enhanceSaga from './enhanceSaga';

export default function* homeworkTask() {
  yield takeLatest(actionTypes.FETCH_STUDENT_TASK_LIST, enhanceSaga(fetchStudentTaskListSaga));
  yield takeLatest(actionTypes.SAVE_TASK, enhanceSaga(saveTaskSaga));
}

// 获取任务
function* fetchStudentTaskListSaga() {
  const data = yield call(getStudentTaskList);
  const { plan, todo } = data;
  const halfHourPeriod = createHalfHourPeriod();
  const planListData = halfHourPeriod.map(v => ({
    data: [],
    period: v,
    currentPeriod: halfHourPeriod[currentTimeToPeriod()],
  }));
  R.forEach((v) => {
    planListData[v.scheduledNode].data.push(v);
  }, plan);
  yield put(actions.ChangePlanTask(planListData));
  yield put(actions.ChangeTodoTask(todo));
}

function* getStudentTaskList(pageSize) {
  try {
    const params = pageSize ? { pageSize } : {};
    const res = yield Fetch.get('/app/api/student/homeworks/todo', params);
    const { code, data } = res;

    if (code !== 0) {
      yield put(actions.FetchStudentTaskList(null, 'ERROR'));
      return false;
    }

    yield put(actions.FetchStudentTaskList(null, 'SUCCESS'));
    yield put(actions.IsFirstGetDropListenerRange(true));

    return data;
  } catch (e) {
    yield put(actions.FetchStudentTaskList(null, 'ERROR'));
    return false;
  }
}

// 更改任务
function* saveTaskSaga({ payload: { id, scheduledNode, taskType } }) {
  try {
    let url = `/app/api/student/homeworks/${id}/schedule?taskType=${taskType}`;
    if (scheduledNode) {
      url += `&scheduledNode=${scheduledNode}`;
    }
    const fetch = () => Fetch.put(url);
    const res = yield call(fetch);

    const { code } = res;
    if (code !== 0) {
      yield put(actions.SaveTask(null, 'ERROR'));
      console.log('更改任务失败：', res);
    } else {
      console.log('成功啦');
      yield put(actions.SaveTask(null, 'SUCCESS'));
    }
  } catch (err) {
    yield put(actions.SaveTask(null, 'ERROR'));
    console.log('更改任务失败：', err);
  }
}
