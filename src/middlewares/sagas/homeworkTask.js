import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import * as actions from '../../actions/homeworkTask';
import * as actionTypes from '../../constants/actionType';
import enhanceSaga from './enhanceSaga';

export default function* homeworkTask() {
  yield takeLatest(actionTypes.CHANGE_LAST_HANDLE_PERIOD_INDEX, enhanceSaga(lastHandlePeriodIndexSaga));
}

// 更改最后一次操作的时间段saga
function* lastHandlePeriodIndexSaga() {
  yield call(reGetListenerRangeList);
}

function* reGetListenerRangeList() {
  const a = yield select(state => state);
  console.log('17-saga', a);
}
