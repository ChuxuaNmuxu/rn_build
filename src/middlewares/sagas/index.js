import { all, fork } from 'redux-saga/effects';
import commonSaga from './commonSaga';

function* rootSaga() {
  yield all([
    fork(commonSaga),
  ]);
}
export default rootSaga;
