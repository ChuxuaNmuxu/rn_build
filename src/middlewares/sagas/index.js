import { all, fork } from 'redux-saga/effects';
import commonSaga from './commonSaga';
// 错题本
import problemOverviewSaga from './problemOverviewSaga';

// 做作业
import doHomeworkSaga from './doHomeworkSaga';
// 作业或者考试记录内容
import recordDetailSaga from './recordDetailSaga';

function* rootSaga() {
  yield all([
    fork(commonSaga),
    fork(problemOverviewSaga),
    fork(doHomeworkSaga),
    fork(recordDetailSaga),
  ]);
}
export default rootSaga;
