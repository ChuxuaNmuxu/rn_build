import {
  takeLatest, put, select,
} from 'redux-saga/effects';
import * as actions from '../../actions/personalInformationAction';
import enhanceSaga from './enhanceSaga';
import fetchApi from '../../config/apiBase/fetchApi';

export default function* myIndexSaga() {
  // 请求 学生个人信息
  yield takeLatest('FETCH_PERSONAL_INFO_REQUEST', enhanceSaga(fetchPersonalInfoSaga));
}

function* fetchPersonalInfoSaga() {
  try {
    const apiFlag = yield select(state => state.config.apiFlag);
    const res = yield Fetch.get(`${fetchApi(fetchApi.cjyun, apiFlag)}/user/studentInfo`);
    const { code, data } = res;
    if (code === 0) {
      yield put(actions.fetchPersonalInfoAction(data, 'SUCCESS'));
    } else {
      yield put(actions.fetchPersonalInfoAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchPersonalInfoAction(e, 'ERROR'));
  }
}
