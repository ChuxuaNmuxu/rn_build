import {
  takeLatest, put,
} from 'redux-saga/effects';
import R from 'ramda';
import qs from 'qs';
import * as actions from '../../actions/mistakeListAction';
import * as actionTypes from '../../constants/actionType';
import enhanceSaga from './enhanceSaga';

export default function* mistakeList() {
  yield takeLatest(actionTypes.FETCH_MISTAKE_LIST, enhanceSaga(fetchDetailSaga));
}

const defaultParams = {
  page: 1,
  pageSize: 10,
};

// 更改最后一次操作的时间段saga
function* fetchDetailSaga(action) {
  console.log(16, action);
  const { params } = action.payload;

  const fetchParam = qs.stringify(Object.assign(defaultParams, params));
  console.log(32, fetchParam);
  const url = `/app/api/student/failed-questions/list?${fetchParam}`;

  try {
    const res = yield Fetch.get(url);
    const { code, data } = res;

    if (code !== 0) {
      yield put(actions.getMistakeList(code, 'ERROR'));
    } else {
      yield put(actions.getMistakeList({ data }, 'SUCCESS'));
    }
  } catch (e) {
    yield put(actions.getMistakeList(e, 'ERROR'));
  }
}
