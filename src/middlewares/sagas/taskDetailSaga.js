import {
  takeLatest, call,
} from 'redux-saga/effects';
// import api from '../../utils/fetch';
// import * as actions from '../../actions/taskDetailAction';
import enhanceSaga from './enhanceSaga';

export default function* taskDetailSaga() {
  // 提交日期
  yield takeLatest('PUT_HOMEWORK_DATE_REQUEST', enhanceSaga(putDateSaga));
}

function* putDateSaga(action) {
  try {
    const params = action.payload;
    const url = '/app/api/student/homeworks/exec-date';
    const fetch = (arg, type) => Fetch.put(url, arg, type);
    const res = yield call(fetch, params, 'json');
    // const res = yield Fetch.put(url, params, 'json');
    console.log(res);
    const { code } = res;
    if (code === 0) {
      // yield put(actions.putHomeworkDateAction({ result: '不做任何操作' }, 'SUCCESS'));
    } else {
      // yield put(actions.putHomeworkDateAction(code, 'ERROR'));
    }
  } catch (e) {
    // yield put(actions.putHomeworkDateAction(e, 'ERROR'));
  }
}
