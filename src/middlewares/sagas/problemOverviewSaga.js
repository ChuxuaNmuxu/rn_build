import {
  takeLatest, put,
} from 'redux-saga/effects';
// import api from '../../utils/fetch';
import * as actions from '../../actions/problemOverviewAction';
// import enhanceSaga from './enhanceSaga';

export default function* classAnalysisSaga() {
  // 请求错题本
  yield takeLatest('FETCH_PROBLEM_OVERVIEW_REQUEST', fetchDataSaga);
}

function* fetchDataSaga(action) {
  console.log(action);
  try {
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // 模拟数据
    const code = 0;
    const result = [
      {
        subjectName: '语文',
        count: 1,
      },
      {
        subjectName: '数学',
        count: 12,
      },
      {
        subjectName: '英语',
        count: 13,
      },
      {
        subjectName: '化学',
        count: 14,
      },
    ];
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
