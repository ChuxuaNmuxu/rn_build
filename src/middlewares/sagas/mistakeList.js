import {
  takeLatest, put,
} from 'redux-saga/effects';
import R from 'ramda';
import qs from 'qs';
import * as actions from '../../actions/mistakeListAction';
import * as actionTypes from '../../constants/actionType';
import enhanceSaga from './enhanceSaga';

export default function* mistakeList() {
  yield takeLatest(actionTypes.FETCH_MISTAKE_LIST, enhanceSaga(getData));
}

const defaultParams = {
  page: 1,
  pageSize: 10,
};

// 更改最后一次操作的时间段saga
function* getData(action) {
  console.log(16, action);
  const {
    params, successFn = R.identity, failureFn = R.identity, action: costomAction = actions.getMistakeList,
  } = action.payload;

  const fetchParam = qs.stringify(Object.assign(defaultParams, params));
  console.log(32, fetchParam);
  const url = `/app/api/student/failed-questions/list?${fetchParam}`;

  try {
    const res = yield Fetch.get(url);
    const { code, data } = res;

    if (code !== 0) {
      failureFn(code);
      yield put(costomAction(code, 'ERROR'));
    } else {
      // const { page, pageSize } = fetchParam;
      successFn(data);
      yield put(costomAction({ data }, 'SUCCESS'));
      console.log(40, successFn);
    }
  } catch (e) {
    failureFn(e);
    yield put(costomAction(e, 'ERROR'));
  }
}
