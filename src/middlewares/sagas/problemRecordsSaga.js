import {
  takeLatest, put,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
// import api from '../../utils/fetch';
import * as actions from '../../actions/problemRecordsAction';
import enhanceSaga from './enhanceSaga';

export default function* problemOverviewSaga() {
  yield takeLatest('FETCH_PROBLEM_RECORDS_INITIAL_FETCH_REQUEST', enhanceSaga(initailSaga));
  yield takeLatest('FETCH_PROBLEM_RECORDS_CHANGE_PARAMS_REFRESH_DATA_REQUEST', enhanceSaga(changeParamsSaga));
  yield takeLatest('FETCH_PROBLEM_RECORDS_DROP_DOWN_REFRESH_DATA_REQUEST', enhanceSaga(dropDownSaga));
}

function* initailSaga(action) {
  try {
    console.log(action.payload, '初始化啦');
    const { currentRecordType } = action.payload;
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // yield call(delay, 1000);// 模拟异步 1秒延迟
    // 模拟数据
    const code = 0;
    // console.warn('年级接口res=', res)
    if (code === 0) {
      yield put(actions.initialFetch({
        subjectData: getSubjectData(),
        recordStateData: getRecordStateData(currentRecordType),
        recordData,
        isRevising,
        allGrade,
      }, 'SUCCESS'));
    } else {
      yield put(actions.initialFetch(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.initialFetch(e, 'ERROR'));
  }
}

function* changeParamsSaga(action) {
  try {
    console.log(action.payload, '初始化啦');
    const { callback } = action.payload;
    // const { currentRecordType } = action.payload;
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // yield call(delay, 1000);// 模拟异步 1秒延迟
    // 模拟数据
    const code = 0;
    // console.warn('年级接口res=', res)
    if (code === 0) {
      yield put(actions.changeParamsfresh({
        recordData,
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
    console.log(action.payload, '初始化啦');
    const { callback } = action.payload;
    // const { currentRecordType } = action.payload;
    // const url = '/analysis/grade/gradereport';
    // const fetch = (params) => api.get(url, params);
    // const res = yield call(fetch);
    // const { code, data: { items } } = res;
    // yield call(delay, 1000);// 模拟异步 1秒延迟
    // 模拟数据
    const code = 0;
    // console.warn('年级接口res=', res)
    if (code === 0) {
      yield put(actions.dropDownRefresh({
        recordData,
      }, 'SUCCESS'));
      callback();
    } else {
      yield put(actions.dropDownRefresh(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.dropDownRefresh(e, 'ERROR'));
  }
}

const subjectData = [{
  // 筛选数据
  subjectId: 0,
  subjectName: '全部学科',
}, {
  subjectId: 1,
  subjectName: '语文',
}, {
  subjectId: 2,
  subjectName: '数学',
}, {
  subjectId: 3,
  subjectName: '英语',
}, {
  subjectId: 4,
  subjectName: '历史',
}, {
  subjectId: 5,
  subjectName: '地理',
}, {
  subjectId: 6,
  subjectName: '语文6',
}, {
  subjectId: 7,
  subjectName: '数学7',
}, {
  subjectId: 8,
  subjectName: '英语8',
}, {
  subjectId: 9,
  subjectName: '历史9',
}, {
  subjectId: 10,
  subjectName: '地理10',
}, {
  subjectId: 11,
  subjectName: '英语11',
}, {
  subjectId: 12,
  subjectName: '历史12',
}, {
  subjectId: 13,
  subjectName: '地理13',
}];
function getSubjectData() {
  return subjectData;
}
// recordStateData = [{ id: 5, text: type === 0 ? '未提交' : '未参加' }, { id: 6, text: '批改中' }, { id: 7, text: '未批改' }];
function getRecordStateData(type) {
  return [{ id: 5, text: type === 0 ? '未提交' : '未参加' }, { id: 6, text: '批改中' }, { id: 7, text: '未批改' }];
}
const allGrade = [{ id: 1, text: '一年级' }, { id: 2, text: '二年级' }, { id: 3, text: '九年级' }, { id: 4, text: '六年级' }];
console.log(allGrade);
const isRevising = [{ id: 8, text: '已订正' }, { id: 9, text: '未订正' }];
console.log(isRevising);

const recordData = [{ // 记录的数据
  id: '0',
  subjectName: '语文',
  title: '语文作业',
  accuracy: '0.5882',
  resultRead: '0',
  publishTime: '2018-08-16T11:27:09+08:00',
  type: '0',
}, {
  id: '1',
  subjectName: '生物',
  title: '生物作业',
  accuracy: '0.4555',
  resultRead: '1',
  publishTime: '2018-08-16T11:27:09+08:00',
  type: '1',
}, {
  id: '2',
  subjectName: '化学',
  title: '化学作业',
  accuracy: '0.9866',
  resultRead: '0',
  publishTime: '2018-08-16T11:27:09+08:00',
  type: '2',
}, {
  id: '3',
  subjectName: '英语',
  title: '英语作业',
  accuracy: '0.2323',
  resultRead: '1',
  publishTime: '2018-09-03T11:27:09+08:00',
  type: '0',
}, {
  id: '4',
  subjectName: '音乐',
  title: '音乐作业',
  accuracy: '1',
  resultRead: '1',
  publishTime: '2018-09-03T11:27:09+08:00',
  type: '2',
}, {
  id: '5',
  subjectName: '物理',
  title: '物理作业',
  accuracy: '1',
  resultRead: '1',
  publishTime: '2018-09-03T11:27:09+08:00',
  type: '1',
}];
console.log(recordData);
