import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import R from 'ramda';
import * as actions from '../../actions/homeworkTask';
import * as actionTypes from '../../constants/actionType';

import enhanceSaga from './enhanceSaga';

export default function* homeworkTask() {
  yield takeLatest(actionTypes.FETCH_STUDENT_TASK_LIST, enhanceSaga(fetchStudentTaskListSaga));
  yield takeLatest(actionTypes.SAVE_TASK, enhanceSaga(saveTaskSaga));
}

// 获取任务
function* fetchStudentTaskListSaga() {
  try {
    const res = yield Fetch.get('/app/api/student/homeworks/todo');
    const { code, data } = res;
    console.log(20, res);
    if (code === 0) {
      const { planList } = yield select(state => state.homeworkTaskReducer);
      const { plan, todo } = data;
      const newPlanList = R.clone(planList);

      // todo 性能优化，判断是否有更改，若有则发送action没有则不发送
      newPlanList.forEach((v, i) => {
        const periodData = plan.filter(value => value.scheduledNode === i);
        v.data = periodData;
      });

      yield put(actions.ChangePlanTask(newPlanList));
      yield put(actions.ChangeTodoTask(todo));
      yield put(actions.FetchStudentTaskList(null, 'SUCCESS'));
    } else {
      yield put(actions.FetchStudentTaskList(null, 'ERROR'));
      console.log(33);
    }
  } catch (err) {
    yield put(actions.FetchStudentTaskList(null, 'ERROR'));
    console.log(36, err);
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
    if (code === 0) {
      console.log('成功啦');
      yield put(actions.SaveTask(null, 'SUCCESS'));
    } else {
      yield put(actions.SaveTask(null, 'ERROR'));
      console.log('更改任务失败：', res);
    }
  } catch (err) {
    yield put(actions.SaveTask(null, 'ERROR'));
    console.log('更改任务失败：', err);
  }
}
