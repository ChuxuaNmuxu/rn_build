import {
  takeLatest, put,
} from 'redux-saga/effects';
import * as actions from '../../actions/myIndexActions';
import enhanceSaga from './enhanceSaga';

export default function* myIndexSaga() {
  // 请求 我的 页面数据
  yield takeLatest('FETCH_MYINDEX_DATA_REQUEST', enhanceSaga(fetchMyIndexSaga));
}

// 请求 我的 页面数据
function* fetchMyIndexSaga(action) {
  try {
    const res = yield Fetch.get('/app/api/game/game/info');
    const { code, data } = res;
    if (code === 0) {
      yield put(actions.fetchMyIndexAction(data, 'SUCCESS'));
    } else {
      yield put(actions.fetchMyIndexAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchMyIndexAction(e, 'ERROR'));
  }
}
