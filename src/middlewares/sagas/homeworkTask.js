import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import R from 'ramda';
import * as actions from '../../actions/homeworkTask';
import * as actionTypes from '../../constants/actionType';
import { createHalfHourPeriod, currentTimeToPeriod } from '../../utils/common';
import enhanceSaga from './enhanceSaga';

export default function* homeworkTask() {
  yield takeLatest(actionTypes.FETCH_STUDENT_TASK_LIST, enhanceSaga(fetchStudentTaskListSaga));
}

// 更改最后一次操作的时间段saga
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

    return data;
  } catch (e) {
    yield put(actions.FetchStudentTaskList(null, 'ERROR'));
    return false;
  }
}
