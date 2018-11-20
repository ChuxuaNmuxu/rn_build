import {
  takeLatest, put,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
// import immer from 'immer';
// import R from 'ramda';
import * as actions from '../../actions/hotReportActions';
import enhanceSaga from './enhanceSaga';

export default function* hotReportSaga() {
  // 请求战绩热报的数据
  yield takeLatest('FETCH_HOTREPORT_DATA_REQUEST', enhanceSaga(fetchHotReportSaga));
}

// 请求战绩热报的数据---此接口为请求单条比赛报告的数据
function* fetchHotReportSaga(action) {
  try {
    const { classGameId } = action.payload;
    const res = yield Fetch.get(`app/api/game/student/detail/${classGameId}`);
    const { code, data } = res;
    console.log(123, data);
    if (code === 0) {
      yield put(actions.fetchHotReportAction(data, 'SUCCESS'));
    } else {
      yield put(actions.fetchHotReportAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchHotReportAction(e, 'ERROR'));
  }
}
