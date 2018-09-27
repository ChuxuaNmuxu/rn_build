import { all, fork } from 'redux-saga/effects';
import commonSaga from './common';
// 错题本
import problemOverviewSaga from './problemOverviewSaga';
// 做作业
import doHomeworkSaga from './doHomeworkSaga';
// 错题重做
import mistakeReformSaga from './mistakeReformSaga';

function* rootSaga() {
  yield all([
    fork(commonSaga),
    fork(problemOverviewSaga),
    fork(doHomeworkSaga),
    fork(mistakeReformSaga),
  ]);
}
export default rootSaga;
