import {
  takeLatest, put,
} from 'redux-saga/effects';
// import api from '../../utils/fetch';
import * as actions from '../../actions/problemOverviewAction';
import enhanceSaga from './enhanceSaga';

export default function* problemOverviewSaga() {
  // 请求错题本
  yield takeLatest('FETCH_PROBLEM_OVERVIEW_REQUEST', enhanceSaga(fetchDataSaga));
}

function* fetchDataSaga(action) {
  try {
    console.log(action);
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
        icon: 'yuwen2',

      },
      {
        subjectName: '数学',
        count: 12,
        icon: 'shuxue1',
      },
      {
        subjectName: '英语',
        count: 13,
        icon: 'yuwen1',
      },
      {
        subjectName: '化学',
        count: 14,
        icon: 'huaxue1',
      },
    ];
    for (let i = 0; i < 50; i++) {
      result.push(
        {
          subjectName: '语文',
          count: i,
          icon: 'yuwen2',
        },
      );
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
