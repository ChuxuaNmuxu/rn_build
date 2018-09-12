import { all, fork } from 'redux-saga/effects';
import commonSaga from './commonSaga';
// 错题本
import problemOverviewSaga from './problemOverviewSaga';

function* rootSaga() {
  yield all([
    fork(commonSaga),
    fork(problemOverviewSaga),
  ]);
}
export default rootSaga;
