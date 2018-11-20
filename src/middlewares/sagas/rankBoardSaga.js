import {
  takeLatest, put, select,
} from 'redux-saga/effects';
import * as actions from '../../actions/rankBoardAction';
import enhanceSaga from './enhanceSaga';
import fetchApi from '../../config/apiBase/fetchApi';

export default function* myIndexSaga() {
  // 请求 积分排名 数据
  yield takeLatest('FETCH_INTEGRALT_DATA_LIST_REQUEST', enhanceSaga(fetchIntegraltDataSaga));
  // 请求 贡献度排名 数据
  yield takeLatest('FETCH_CONTRIBUTION_DATA_LIST_REQUEST', enhanceSaga(fetchContributionDataSaga));
}

function* fetchIntegraltDataSaga(action) {
  try {
    // 先请求云平台接口---查询学生所在的班级Id列表
    const { studentId } = action.payload;
    const apiFlag = yield select(state => state.config.apiFlag);
    const res1 = yield Fetch.get(`${fetchApi(fetchApi.cjyun, apiFlag)}/student/classId?studentId=${studentId}`);
    const code1 = res1.code;
    // 请求班级数据成功后再去请求 积分排名 数据
    if (code1 === 0) {
      const classId = res1.data[0];
      const res2 = yield Fetch.get(`/app/api/game/score/ranking/${classId}`);
      const { code, data } = res2;
      if (code === 0) {
        yield put(actions.fetchIntegraltDataAction(data, 'SUCCESS'));
      } else {
        yield put(actions.fetchIntegraltDataAction(code, 'ERROR'));
      }
    }
  } catch (e) {
    yield put(actions.fetchIntegraltDataAction(e, 'ERROR'));
  }
}

function* fetchContributionDataSaga(action) {
  try {
    // 先请求云平台接口---查询学生所在的班级Id列表
    const { studentId } = action.payload;
    const apiFlag = yield select(state => state.config.apiFlag);
    const res1 = yield Fetch.get(`${fetchApi(fetchApi.cjyun, apiFlag)}/student/classId?studentId=${studentId}`);
    const code1 = res1.code;
    // 请求班级数据成功后再去请求 贡献度排名 数据
    if (code1 === 0) {
      const classId = res1.data[0];
      const res2 = yield Fetch.get(`/app/api/game/contribute/score/ranking/${classId}`);
      const { code, data } = res2;
      if (code === 0) {
        yield put(actions.fetchContributionDataAction(data, 'SUCCESS'));
      } else {
        yield put(actions.fetchContributionDataAction(code, 'ERROR'));
      }
    }
  } catch (e) {
    yield put(actions.fetchContributionDataAction(e, 'ERROR'));
  }
}
