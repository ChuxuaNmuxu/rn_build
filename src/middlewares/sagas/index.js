import { all, fork } from 'redux-saga/effects';
import commonSaga from './common';
// 错题本
import problemOverviewSaga from './problemOverviewSaga';
// 做作业
import doHomeworkSaga from './doHomeworkSaga';
// 作业或者考试记录内容
import recordDetailSaga from './recordDetailSaga';
// 错题重做
import mistakeReformSaga from './mistakeReformSaga';

function* rootSaga() {
  yield all([
    fork(commonSaga),
    fork(problemOverviewSaga),
    fork(doHomeworkSaga),
    fork(recordDetailSaga),
    fork(mistakeReformSaga),
  ]);
}
export default rootSaga;
