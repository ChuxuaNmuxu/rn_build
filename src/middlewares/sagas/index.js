import { all, fork } from 'redux-saga/effects';
// 监听路由变化
import router from './router';
import commonSaga from './common';
// 错题本
import problemOverviewSaga from './problemOverviewSaga';
// 预览作业
import previewHomeworkSaga from './previewHomeworkSaga';
// 做作业
import doHomeworkSaga from './doHomeworkSaga';
// 作业或者考试记录内容
import recordDetailSaga from './recordDetailSaga';
// 错题重做
import mistakeReformSaga from './mistakeReformSaga';
// 做题记录
import problemRecordsSaga from './problemRecordsSaga';
// 作业排期
import homeworkTask from './homeworkTask';
// 任务详情
import taskDetailSaga from './taskDetailSaga';
// 作业批阅
import homeworkCorrectingSaga from './homeworkCorrectingSaga';
// 错题详情
import inCorrectProblemDetail from './inCorrectProblemDetail';
// 错题列表
import mistakeListSaga from './mistakeListSaga';
// 标记错题原因
import markFailReason from './markFailReason';
// 战绩热报
import hotReportSaga from './hotReportSaga';
/**
 * 荣誉详情包含
 * 积分、挑战次数、团队奉献度
 */
import detailsHonor from './detailsHonor';
// 我的 页面
import myIndexSaga from './myIndexSaga';
// 竞争科目设置
import subjectSettingSaga from './subjectSettingSaga';


function* rootSaga() {
  yield all([
    fork(router),
    fork(commonSaga),
    fork(problemOverviewSaga),
    fork(previewHomeworkSaga),
    fork(doHomeworkSaga),
    fork(recordDetailSaga),
    fork(mistakeReformSaga),
    fork(problemRecordsSaga),
    fork(homeworkTask),
    fork(taskDetailSaga),
    fork(homeworkCorrectingSaga),
    fork(inCorrectProblemDetail),
    fork(mistakeListSaga),
    fork(markFailReason),
    fork(hotReportSaga),
    fork(detailsHonor),
    fork(myIndexSaga),
    fork(subjectSettingSaga),
  ]);
}
export default rootSaga;
