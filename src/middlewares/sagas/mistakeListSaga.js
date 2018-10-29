import {
  takeLatest, put,
} from 'redux-saga/effects';
import R from 'ramda';
import qs from 'qs';
import * as actions from '../../actions/mistakeListAction';
import * as actionTypes from '../../constants/actionType';
import enhanceSaga from './enhanceSaga';

export default function* mistakeListSaga() {
  yield takeLatest(actionTypes.FETCH_MISTAKE_LIST, enhanceSaga(getDataSaga));
}

// 更改最后一次操作的时间段saga
function* getDataSaga(action) {
  const {
    params, successFn = R.identity, failureFn = R.identity, action: costomAction = actions.getMistakeListAction,
  } = action.payload;

  const fetchParam = qs.stringify(params);
  console.log(21, fetchParam);
  const url = `/app/api/student/failed-questions/list?${fetchParam}`;
  // console.log('url=', url);
  try {
    const res = yield Fetch.get(url);
    const { code, data, total } = res;
    // console.log('getDataSaga的res=', res);
    if (code !== 0) {
      failureFn(code);
      yield put(costomAction(code, 'ERROR'));
    } else {
      // const { page, pageSize } = fetchParam;
      successFn(data);
      // console.log(39, successFn(data));
      yield put(costomAction({ data, total }, 'SUCCESS'));
      // console.log(40, successFn);
    }
  } catch (e) {
    // failureFn(e);
    yield put(costomAction(e, 'ERROR'));
  }
}
