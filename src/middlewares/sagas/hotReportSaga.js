import {
  takeLatest, put,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
// import immer from 'immer';
// import R from 'ramda';
import * as actions from '../../actions/hotReportActions';
import enhanceSaga from './enhanceSaga';

export default function* hotReportSaga() {
  // 请求战绩热报的数据
  yield takeLatest('FETCH_HOTREPORT_DATA_REQUEST', enhanceSaga(fetchHotReportSaga));
}

// 请求战绩热报的数据
function* fetchHotReportSaga(action) {
  try {
    // const { id } = action.payload;
    // const url = `app/api/student/homeworks/${id}`;
    // const fetch = arg => Fetch.get(url, arg);
    // const res = yield call(fetch);
    // const { code, data } = res;
    const code = 0;
    // 战绩热报模拟数据
    const hotReportData = [{
      title: '12-22历史作业--1人1队',
      matchToOpponent: true, // 是否匹配到了对手
      result: 1, // 1胜利 0失败
      integral: 3, // 个人积分
      contribution: null, // 团队贡献度
      resultList: [{
        student1: {
          studentName: '王莉莉',
          sex: 1, // 性别1女 0男
          accuracy: 0.5,
          result: 1,
        },
        student2: {
          studentName: '李晓文',
          sex: 0, // 性别1女 0男
          accuracy: 0.35,
          result: 0,
        },
      }],
    }, {
      title: '12-22历史作业--2人1队',
      matchToOpponent: true, // 是否匹配到了对手
      result: 0, // 1胜利 0失败
      integral: 1,
      contribution: 1,
      resultList: [{
        student1: {
          studentName: '王莉莉',
          sex: 1, // 性别1女 0男
          accuracy: 0.4,
          result: 0,
        },
        student2: {
          studentName: '李晓文',
          sex: 0, // 性别1女 0男
          accuracy: 0.5,
          result: 1,
        },
      }, {
        student1: {
          studentName: '王莉莉',
          sex: 1, // 性别1女 0男
          accuracy: 0.4,
          result: 0,
        },
        student2: {
          studentName: '李晓文',
          sex: 0, // 性别1女 0男
          accuracy: 0.5,
          result: 1,
        },
      }],
    }, {
      title: '12-22历史作业--3人1队',
      matchToOpponent: true, // 是否匹配到了对手
      result: 1, // 1胜利 0失败
      integral: 3,
      contribution: 3,
      resultList: [{
        student1: {
          studentName: '王莉莉',
          sex: 1, // 性别1女 0男
          accuracy: 0.2,
          result: 1,
        },
        student2: {
          studentName: '李晓文',
          sex: 0, // 性别1女 0男
          accuracy: 0.8,
          result: 0,
        },
      }, {
        student1: {
          studentName: '王莉莉',
          sex: 1, // 性别1女 0男
          accuracy: 0.1,
          result: 0,
        },
        student2: {
          studentName: '李晓文',
          sex: 0, // 性别1女 0男
          accuracy: 0.5,
          result: 1,
        },
      }, {
        student1: {
          studentName: '王莉莉',
          sex: 1, // 性别1女 0男
          accuracy: 0.5,
          result: 0,
        },
        student2: {
          studentName: '李晓文',
          sex: 0, // 性别1女 0男
          accuracy: 0.5,
          result: 1,
        },
      }],
    }, {
      title: '12-22历史作业--没有对手',
      matchToOpponent: false, // 是否匹配到了对手
      successResult: 0.85, // 战胜了多少人
    }];
    if (code === 0) {
      yield put(actions.fetchHotReportAction(hotReportData, 'SUCCESS'));
    } else {
      yield put(actions.fetchHotReportAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchHotReportAction(e, 'ERROR'));
  }
}
