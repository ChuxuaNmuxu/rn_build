import {
  takeLatest, call,
} from 'redux-saga/effects';
// import api from '../../utils/fetch';
// import _ from 'ramda';
import api from '../../utils/fetch';
// import * as actions from '../../actions/commonActions';
import enhanceSaga from './enhanceSaga';

export default function* recordDetailSaga() {
  // 请求考试数据
  yield takeLatest('WRONG_REASON_RETURN_FAIL_REASON', enhanceSaga(retrunFailReason));
}
function* retrunFailReason(action) {
  try {
    console.log(action.payload, '我是action快来see');
    const {
      id, type, reason, callback,
    } = action.payload;
    const url = `/app/api/student/failed-questions/questions/${id}/fail-reason?category=${type}`;
    const params = {
      reason,
    };
    const fetch = arg => Fetch.put(url, arg);
    const res = yield call(fetch, params);
    const { code } = res;
    console.log(res);
    // 模拟数据
    // const code = 0;
    if (code === 0) {
      console.log('发送成功');
      callback();
    } else {
      // yield put(actions.fetchExaminationData(code, 'ERROR'));
      console.log('根据状态码返回信息');
    }
  } catch (e) {
    console.log(e);
    // yield put(actions.fetchExaminationData(e, 'ERROR'));
  }
}
