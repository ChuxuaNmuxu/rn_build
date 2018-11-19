import {
  takeLatest, put, call, all,
} from 'redux-saga/effects';
import enhanceSaga from './enhanceSaga';
import * as actions from '../../actions/detailsHonor';
import * as actionTypes from '../../constants/actionType';

export default function* detailsHonor() {
  yield takeLatest(actionTypes.GET_DETAILS_HONOR, enhanceSaga(detailsHonorSaga));
}

function* detailsHonorSaga(action) {
  const { pieUrl, scrollUrl } = action.payload;
  try {
    let scrollList = () => Fetch.get(scrollUrl);
    let pieChart = () => Fetch.get(pieUrl);


    [scrollList, pieChart] = yield all([
      call(scrollList),
      call(pieChart),
    ]);

    yield put(actions.GetDetailsHonor({
      scrollList: scrollList.data,
      pieChart: pieChart.data,
    }, 'SUCCESS'));
  } catch (e) {
    console.log(21, e);
  }
}
