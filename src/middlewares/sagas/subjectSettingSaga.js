import {
  takeLatest, put, call,
} from 'redux-saga/effects';
import * as actions from '../../actions/subjectSettingAction';
import enhanceSaga from './enhanceSaga';

export default function* myIndexSaga() {
  // 请求 竞争科目设置页面数据
  yield takeLatest('FETCH_SUBJECT_DATA_LIST_REQUEST', enhanceSaga(fetchSubjectSettingDataSaga));
  // 设置该科目是否参与竞争
  yield takeLatest('SETTING_SUBJECT_ISJOIN_REQUEST', enhanceSaga(settingSubjectIsJoinSaga));
}

function* fetchSubjectSettingDataSaga() {
  try {
    const res = yield Fetch.get('/app/api/game/join/subject/list');
    const { code, data } = res;
    if (code === 0) {
      yield put(actions.fetchSubjectSettingDataAction(data, 'SUCCESS'));
    } else {
      yield put(actions.fetchSubjectSettingDataAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchSubjectSettingDataAction(e, 'ERROR'));
  }
}

function* settingSubjectIsJoinSaga(action) {
  try {
    const { answerParam } = action.payload;
    const url = '/app/api/game/join/setting';
    const fetch = (arg, type) => Fetch.post(url, arg, type);
    const res = yield call(fetch, answerParam, 'json');
    const { code } = res;
    if (code === 0) {
      yield put(actions.settingSubjectIsJoinAction(code, 'SUCCESS'));
    } else {
      yield put(actions.settingSubjectIsJoinAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.settingSubjectIsJoinAction(e, 'ERROR'));
  }
}
