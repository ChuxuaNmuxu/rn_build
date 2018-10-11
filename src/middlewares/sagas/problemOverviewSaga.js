import {
  takeLatest, put, call,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import api from '../../utils/fetch';
import * as actions from '../../actions/problemOverviewAction';
import enhanceSaga from './enhanceSaga';
import { strFormatterIconName } from '../../utils/common';

export default function* problemOverviewSaga() {
  // 请求错题本
  yield takeLatest('FETCH_PROBLEM_OVERVIEW_REQUEST', enhanceSaga(fetchDataSaga));
}

function* fetchDataSaga(action) {
  try {
    const url = '/app/api/student/failed-questions/subjects';
    const fetch = params => api.get(url, params);
    const res = yield call(fetch, {
      // page: 1,
      // pageSize: 100,
    });
    console.log(res);
    const { code, data } = res;
    const result = [];
    for (let i = 0; i < data.length; i++) {
      result.push({
        icon: strFormatterIconName(data[i].subjectName),
        ...data[i],
      });
    }
    // console.warn('年级接口res=', res)
    if (code === 0) {
      yield put(actions.fetchDataAction(result, 'SUCCESS'));
    } else {
      yield put(actions.fetchDataAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchDataAction(e, 'ERROR'));
  }
}
