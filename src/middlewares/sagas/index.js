import { all, fork } from 'redux-saga/effects';
import commonSaga from './common';
// 错题本
import problemOverviewSaga from './problemOverviewSaga';

// 做作业
import doHomeworkSaga from './doHomeworkSaga';

function* rootSaga() {
  yield all([
    fork(commonSaga),
    fork(problemOverviewSaga),
    fork(doHomeworkSaga),
  ]);
}
export default rootSaga;
