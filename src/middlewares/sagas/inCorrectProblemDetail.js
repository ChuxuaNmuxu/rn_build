import {
  takeLatest, put,
} from 'redux-saga/effects';
// import R from 'ramda';
import qs from 'qs';
import * as actions from '../../actions/incorrectProblemDetail';
import * as actionTypes from '../../constants/actionType';
import enhanceSaga from './enhanceSaga';

export default function* getIncorrectProblemDetail() {
  yield takeLatest(actionTypes.FETCH_INCORRECT_PROPBLEM_DETAIL, enhanceSaga(fetchDetailSaga));
}

// 更改最后一次操作的时间段saga params: { id, category }, index, len: mistakeList.length, isInit: 'Y',
function* fetchDetailSaga(action) {
  const {
    params: { id, ...rest }, isInit, index, len,
  } = action.payload;
  try {
    const res = yield Fetch.get(`/app/api/student/failed-questions/${id}?${qs.stringify(rest)}`);
    const { code, data } = res;
    console.log(res, '???????????????????????????????');

    if (code === 0) {
      const cusData = transFromHomeworkDataList(data);
      yield put(actions.getIncorrectInfo({
        cusData, index, isInit, len,
      }, 'SUCCESS'));
    } else {
      yield put(actions.getIncorrectInfo(code, 'ERROR'));
    }
  } catch (e) {
    console.log(e, '什么垃圾代码');
    yield put(actions.getIncorrectInfo(e, 'ERROR'));
  }
}

function transFromHomeworkDataList(data) {
  return {
    htmlContent: data.content,
    AnserSummarizationData: {
      // 正确答案
      correctAnser: data.answer,
      // 学生答案（客观题专用）
      studentAnser: data.studentAnswer,
      // 得分
      score: data.score,
      // 题目类型 题目类型(0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题) ,
      questionType: (data.type === 10 || data.type === 11) ? 'sub' : 'obj',
      // 难易度(考试不展示难易度，写着先而已)
      difficultyDegree: getdifficultyDegree(data.difficultyLevel),
    },
    // 学生zhu||ke观题答案
    studentAnserImage: data.studentAnswerFiles === null ? [] : data.studentAnswerFiles.map(item => ({ url: item })),
    // 主观题专用正确答案
    rightAnser: data.answerContent !== null ? data.answerContent : [],
    causeOfErrorNum: data.failReason,
  };
}


function getdifficultyDegree(difficultyLevel) {
  if ((difficultyLevel === 1)) {
    return 1;
  }
  if (difficultyLevel === 5) {
    return 2;
  }
  if (difficultyLevel === 0) {
    return 3;
  }
  return 0;
}
