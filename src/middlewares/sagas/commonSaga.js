import {
  takeLatest,
// all,
// fork,
} from 'redux-saga/effects';
import {
  TEST,
} from '../../constants/actionType';


function* test() {
  yield setTimeout(() => {
    console.log('test-saga');
  }, 0);
}

export default function* commonSaga() {
  yield takeLatest(TEST, test);
  // yield test();
}
