import {
  takeLatest, put,
} from 'redux-saga/effects';
// import R from 'ramda';
import qs from 'qs';
import * as actions from '../../actions/incorrectProblemDetail';
import * as actionTypes from '../../constants/actionType';
import enhanceSaga from './enhanceSaga';

export default function* getIncorrectProblemDetail() {
  yield takeLatest(actionTypes.FETCH_INCORRECT_PROPBLEM_DETAIL, enhanceSaga(fetchDetailSaga));
}

// 更改最后一次操作的时间段saga
function* fetchDetailSaga(action) {
  const { params: { id, ...rest } } = action.payload;
  try {
    const res = yield Fetch.get(`/app/api/student/failed-questions/${id}?${qs.stringify(rest)}`);
    const { code, data } = res;

    if (code !== 0) {
      yield put(actions.getIncorrectInfo(code, 'ERROR'));
    } else {
      yield put(actions.getIncorrectInfo({ data, id }, 'SUCCESS'));
    }
  } catch (e) {
    yield put(actions.getIncorrectInfo(e, 'ERROR'));
  }
}
