import {
  takeLatest, put, call,
} from 'redux-saga/effects';
import * as actions from '../../actions/homeworkCorrectingAction';
import enhanceSaga from './enhanceSaga';
import draftToHtml from '../../utils/draftjsToHtml';


export default function* homeworkCorrectingSaga() {
  // 获取list
  yield takeLatest('FETCH_HOMEWORK_CORRECTING_LIST_REQUEST', enhanceSaga(fetchListSaga));
  // 保存分数
  yield takeLatest('HOMEWORK_CORRECTING_SAVE_SCORE_REQUEST', enhanceSaga(saveScoreSaga));
}

function* fetchListSaga(action) {
  try {
    const homeworkId = action.payload;
    const url = `/app/api/student/homeworks/${homeworkId}/mark/question/list`;
    const fetch = arg => Fetch.get(url, arg);
    const res = yield call(fetch);
    console.log(21, res);
    for (let i = 0; i < res.data.length; i++) {
      const newContent = []; // 新的材料集合，便于swiper调用
      const { materialContent, content, answerContent } = res.data[i];
      if (materialContent) newContent.push(materialContent); // 材料
      if (content) newContent.push(content); // 题干
      if (answerContent) newContent.push(answerContent); // 标准答案
      res.data[i].newContent = newContent;
      res.data[i].score = undefined; // 批阅分数
      res.data[i].finishBtnDisable = true; // 完成按钮是否可以点击
    }
    const { code } = res;
    if (code === 0 && res.data.length > 0) {
      console.log(72, res.data[0].content, draftToHtml(JSON.parse(res.data[0].content)));
      yield put(actions.fetchListAction(res.data, 'SUCCESS'));
    } else {
      yield put(actions.fetchListAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchListAction(e, 'ERROR'));
  }
}

function* saveScoreSaga(action) {
  try {
    const {
      params: {
        studentId, homeworkId, questionId, score, index,
      },
      callBack,
    } = action.payload;
    const url = `/app/api/student/homeworks/${studentId}/${homeworkId}/${questionId}/mark?score=${score}`;
    const fetch = arg => Fetch.post(url, arg);
    const res = yield call(fetch);
    console.log(res);
    if (res.code === 0) {
      callBack();
      yield put(actions.controlFinsihBtnAction({ finishBtnDisable: true, index }));
    } else {
      yield put(actions.saveCorrectResultAction(res.code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.saveCorrectResultAction(e, 'ERROR'));
  }
}
