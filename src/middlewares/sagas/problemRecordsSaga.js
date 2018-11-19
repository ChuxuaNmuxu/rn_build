import {
  takeLatest, put, call, all,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import _ from 'ramda';
import api from '../../utils/fetch';
import * as actions from '../../actions/problemRecordsAction';
import enhanceSaga from './enhanceSaga';

export default function* problemOverviewSaga() {
  yield takeLatest('FETCH_PROBLEM_RECORDS_INITIAL_FETCH_REQUEST', enhanceSaga(initailSaga));
  yield takeLatest('FETCH_PROBLEM_RECORDS_CHANGE_PARAMS_REFRESH_DATA_REQUEST', enhanceSaga(changeParamsSaga));
  yield takeLatest('FETCH_PROBLEM_RECORDS_DROP_DOWN_REFRESH_DATA_REQUEST', enhanceSaga(dropDownSaga));
}

function callFetch(urlArr, payload) {
  const allPormise = urlArr.map(
    (urlItem) => {
      // console.log(api.get(urlItem, payload), 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      const fetch = params => api.get(urlItem, params);
      return call(fetch, payload);
    },
  );
  return allPormise;
}

function* initailSaga(action) {
  try {
    console.log(action.payload, '初始化啦');
    const {
      currentRecordType,
    } = action.payload;
    // recordState, page, isRevising, allGrade, currentSubjectId,
    const homeWorkUrl = [
      '/app/api/student/homeworks/history',
      '/app/api/student/homeworks/screening',
    ];
    const examUrl = [
      '/app/api/student/exam/record',
      '/app/api/student/exam/screening',
    ];

    // 根据切换作业或考试选择不同的URL全家桶
    const allPormise = callFetch(
      currentRecordType === 0 ? homeWorkUrl : examUrl, { page: '1', pageSize: '12' },
    );
    const [
      getRecordData,
      getSubjectAndGrade,
    ] = yield all([...allPormise]);
    console.log(getRecordData, 'getRecordDatagetRecordData');
    console.log(getSubjectAndGrade, 'getSubjectAndGradegetSubjectAndGrade');
    if (getRecordData.code === 0 && getSubjectAndGrade.code === 0) {
      const { grades, subjects } = getSubjectAndGrade.data;
      // 如果是作业记录，则添加胜负标识---模拟数据
      if (currentRecordType === 0) {
        getRecordData.data.map(item => item.competeResult = parseInt(Math.random() * 10));
      }
      // 初始化结果转换，注释里有前端开发需要的字段，转换结果就是酱紫。
      yield put(actions.initialFetch({
        subjectData: getSubjectData(subjects),
        recordStateData: getRecordStateData(currentRecordType),
        recordData: transfromRecordData(getRecordData.data, currentRecordType),
        isRevisingData,
        allGrade: getAllGrade(grades),
        total: getRecordData.total,
      }, 'SUCCESS'));
    } else {
      yield put(actions.initialFetch({}, 'ERROR'));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.initialFetch(e, 'ERROR'));
  }
}

function* changeParamsSaga(action) {
  try {
    console.log(action.payload, '改变参数啦');
    const {
      callback, recordState, page, isRevising, allGrade, currentSubjectId, currentRecordType,
    } = action.payload;
    // 作业和考试参数不一样
    const homeworkParams = {
      status: recordState,
      page,
      revise: isRevising,
      uniGradeId: allGrade[0],
      subjectId: currentSubjectId === 'allSub' ? undefined : currentSubjectId,
      pageSize: 12,
    };
    const examParams = {
      status: recordState,
      page,
      uniGradeId: allGrade[0],
      subjectId: currentSubjectId === 'allSub' ? undefined : currentSubjectId,
      pageSize: 12,
    };
    // const { currentRecordType } = action.payload;
    // 接口也是不一样
    const url = currentRecordType === 0 ? '/app/api/student/homeworks/history' : '/app/api/student/exam/record';
    const fetch = params => api.get(url, params);
    const res = yield call(fetch, currentRecordType === 0 ? homeworkParams : examParams);
    const { code, data, total } = res;
    console.log(res, '改变参数啦改变参数啦改变参数啦');
    if (code === 0) {
      yield put(actions.changeParamsfresh({
        recordData: transfromRecordData(data, currentRecordType),
        total,
      }, 'SUCCESS'));
      callback();
    } else {
      yield put(actions.changeParamsfresh(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.changeParamsfresh(e, 'ERROR'));
  }
}

function* dropDownSaga(action) {
  try {
    console.log(action.payload, '上啦获取更多啦');
    const {
      callback, recordState, page, isRevising, allGrade, currentSubjectId, currentRecordType,
    } = action.payload;
    const homeworkParams = {
      status: recordState,
      page,
      revise: isRevising,
      uniGradeId: allGrade[0],
      subjectId: currentSubjectId === 'allSub' ? undefined : currentSubjectId,
      pageSize: 12,
    };
    const examParams = {
      status: recordState,
      page,
      uniGradeId: allGrade[0],
      subjectId: currentSubjectId === 'allSub' ? undefined : currentSubjectId,
      pageSize: 12,
    };
    // const { currentRecordType } = action.payload;
    const url = currentRecordType === 0 ? '/app/api/student/homeworks/history' : '/app/api/student/exam/record';
    const fetch = params => api.get(url, params);
    const res = yield call(fetch, currentRecordType === 0 ? homeworkParams : examParams);
    const { code, data, total } = res;
    // console.log(900000000000, res);
    // console.warn('年级接口res=', res)
    if (code === 0) {
      // 如果是作业记录，则添加胜负标识---模拟数据
      if (currentRecordType === 0) {
        data.map(item => item.competeResult = parseInt(Math.random() * 10));
      }
      yield put(actions.dropDownRefresh({
        recordData: transfromRecordData(data, currentRecordType),
        total,
      }, 'SUCCESS'));
      callback();
      yield put(actions.footerLoading(false));
    } else {
      yield put(actions.dropDownRefresh(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.dropDownRefresh(e, 'ERROR'));
  }
}

// const subjectData = [{
//   // 筛选数据
//   subjectId: 0,
//   subjectName: '全部学科',
// }, {
//   subjectId: 1,
//   subjectName: '语文',
// }, {
//   subjectId: 2,
//   subjectName: '数学',
// }, {
//   subjectId: 3,
//   subjectName: '英语',
// }];
function getSubjectData(data) {
  if (_.isEmpty(data)) {
    return [
      // {
      //   // 筛选数据
      //   subjectId: 'allSub',
      //   subjectName: '全部学科',
      // },
    ];
  }
  const subjectData = [
    {
      // 筛选数据
      subjectId: 'allSub',
      subjectName: '全部学科',
    },
    ...data,
  ];

  return subjectData;
}
// recordStateData = [{ id: 5, text: type === 0 ? '未提交' : '未参加' }, { id: 6, text: '批改中' }, { id: 7, text: '未批改' }];
// 写死的数据
// 考试状态[1：未参加, 2: 批改中, 3:已批改]
function getRecordStateData(type) {
  const examSattus = [{ id: 1, text: '未参加' }, { id: 2, text: '批改中' }, { id: 3, text: '已批改' }];
  const homeworkSattus = [{ id: 5, text: '未提交' }, { id: 3, text: '批改中' }, { id: 4, text: '已批改' }];
  return type === 0 ? homeworkSattus : examSattus;
}
// const allGrade = [{ id: 1, text: '一年级' }, { id: 2, text: '二年级' }, { id: 3, text: '九年级' }, { id: 4, text: '六年级' }];
function getAllGrade(data) {
  const arr = [];
  if (_.isEmpty(data)) {
    return [];
  }
  data.map(
    item => (arr.push({
      id: item.uniGradeId,
      text: item.gradeName,
    })),
  );
  return arr;
}
// 写死的数据
const isRevisingData = [{ id: 1, text: '已订正' }, { id: 0, text: '未订正' }];
console.log(isRevisingData);

function transfromRecordData(data, type) {
  const arr = [];
  if (_.isEmpty(data)) {
    return [];
  }
  if (type === 0) {
    data.map(item => (
      arr.push({
        id: item.homeworkId,
        subjectName: item.subjectName,
        title: `${item.title}`,
        accuracy: item.accuracy,
        resultRead: item.resultRead,
        publishTime: item.publishTime,
        type: getHomeWorkType(item),
        // 是否可以去重做
        unknownRedo: item.allowMakeUp,
        competeResult: item.competeResult, // 作业记录胜负字段
      })
    ));
  } else {
    data.map(item => (
      arr.push({
        id: item.examId,
        subjectName: item.subjectName,
        title: `${item.examName}`,
        accuracy: item.score,
        resultRead: item.resultRead,
        publishTime: item.examStartAt,
        type: getExamType(item),
      })
    ));
  }

  return arr;
}

function getHomeWorkType(item) {
  const { status, submitted } = item;
  // if (status === 5) {
  //   // 逾期
  //   return 'yuqi';
  // }
  // 批改且有成绩
  if (status === 4) {
    return 1;
  }
  // 提交了，未批改||批改都=批改中
  if (submitted === 1) {
    return 0;
  }
  // 其他都当做逾期
  return 'yuqi';
}

function getExamType(item) {
  const { isMarked, submitStatus } = item;
  // if (status === 5) {
  //   // 逾期
  //   return 'yuqi';
  // }
  // 批改且有成绩
  if (isMarked === 1) {
    return 1;
  }
  // 提交了，未批改||批改都=批改中
  if (submitStatus === 1) {
    return 0;
  }
  // 其他都当做mei kaoshi
  return 'yuqi';
}
