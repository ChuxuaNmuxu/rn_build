import {
  takeLatest, put,
} from 'redux-saga/effects';
// import R from 'ramda';
import * as actions from '../../actions/incorrectProblemDetail';
import * as actionTypes from '../../constants/actionType';
import enhanceSaga from './enhanceSaga';

export default function* markFailReason() {
  yield takeLatest(actionTypes.PUT_FAIL_PROBLEM_REASON, enhanceSaga(handleFailReason));
}

// 更改最后一次操作的时间段saga
function* handleFailReason(action) {
  const {
    id,
    category,
    params: {
      reason,
    },
  } = action.payload;

  console.log(23, action);

  try {
    const res = yield Fetch.put(`/app/api/student/failed-questions/questions/${id}/fail-reason?category=${Number(category)}`, { reason }, 'json');
    const { code, data } = res;

    console.log(26, res);

    if (code !== 0) {
      yield put(actions.markFailReason(code, 'ERROR'));
    } else {
      yield put(actions.markFailReason({ data, id }, 'SUCCESS'));
    }
  } catch (e) {
    yield put(actions.markFailReason(e, 'ERROR'));
  }
}
