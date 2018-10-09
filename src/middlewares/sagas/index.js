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
// 做题记录
import problemRecordsSaga from './problemRecordsSaga';
// 作业排期
// import homeworkTask from './homeworkTask';

function* rootSaga() {
  yield all([
    fork(commonSaga),
    fork(problemOverviewSaga),
    fork(doHomeworkSaga),
    fork(recordDetailSaga),
    fork(mistakeReformSaga),
    fork(problemRecordsSaga),
    // fork(homeworkTask),
  ]);
}
export default rootSaga;
