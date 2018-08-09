import {
  takeLatest,
// all,
// fork,
} from 'redux-saga/effects';
import {
  TEST,
} from '../constants/action';

function* test() {
  yield setTimeout(() => {
    console.log('test-saga');
  }, 0);
}

function* saga() {
  yield takeLatest(TEST, test);
  // yield test();
}

// function* rootSaga() {
//   yield all([
//     fork(saga),
//   ]);
// }

export default saga;
