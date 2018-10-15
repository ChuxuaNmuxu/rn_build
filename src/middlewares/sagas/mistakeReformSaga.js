import {
  takeLatest, put, fork, call, select,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
// import api from '../../utils/fetch';
import R from 'ramda';
import immer from 'immer';
import moment from 'moment';
import * as actions from '../../actions/mistakeReformAction';
import enhanceSaga from './enhanceSaga';

export default function* mistakeReformSaga() {
  yield takeLatest('SAVE_QUESTIONS', enhanceSaga(saveQeustionsSaga));
  // 提交答案，判断对错
  yield takeLatest('MISTAKE_SUBMIT_ANSWER_REQUEST', enhanceSaga(submitAnswerSaga));
  // 提交错误分析
  yield takeLatest('MISTAKE_SUBMIT_ANSWER_ERROR_SUBMIT_RADIO_REQUEST', enhanceSaga(submitRadioSaga));
  // 确认移除错题
  yield takeLatest('MISTAKE_SUBMIT_ANSWER_CORRECT_CONFIRM_REQUEST', enhanceSaga(confirmDeleteSaga));
}

const getState = state => state;

function* saveQeustionsSaga(action) {
  try {
    const questions = action.payload;
    console.log(23, questions);
    const result = immer(questions, (draft) => {
      for (let i = 0; i < draft.length; i++) {
        draft[i].controlComponent = {
          showSubmitBtn: false,
          showCorrectInfo: {
            showAll: false,
            showAnswer: false,
            showConfirm: false,
          },
          showErrorInfo: {
            showAll: false,
            showWord: true,
            showRadio: false,
          },
          showSubjectiveInfo: {
            urlSource: {},
            answerInfo: {}, // 主观题的返回信息
            showAll: false,
            otherStudentAnswer: [],
            teacherAnswer: '',
            showTrueOrFalseButton: true,
          },
          // 单选题答案
          objectiveAnswer: {
            value: undefined,
          },
        };
      }
    });
    yield put(actions.saveQuestionsAction(result, 'SUCCESS'));
  } catch (e) {
    yield put(actions.saveQuestionsAction(e, 'ERROR'));
  }
}

function* submitAnswerSaga(action) {
  try {
    const { item: { type } } = action.payload;
    // 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题
    if (type === 1 || type === 2 || type === 3 || type === 4) {
      // 客观题
      yield fork(objectiveSaga, action);
    }
    if (type === 10 || type === 11) {
      // 主观题
      yield fork(subjectiveSaga, action);
    }
  } catch (e) {
    yield put(actions.submitAnswerAction(e, 'ERROR'));
  }
}

function* submitRadioSaga(action) {
  try {
    const { index, value, item } = action.payload;
    const url = `/app/api/student/failed-questions/questions/${item.id}/fail-reason`;
    const fetch = arg => Fetch.put(url, arg);
    const params = {
      reason: value,
    };
    const res = yield call(fetch, params);
    console.log('错题radio', res);
    const { code } = res;
    if (res.code === 0) {
      yield put(actions.submitRadioAction({ value, index }, 'SUCCESS')); // 目前没做什么操作
    } else {
      yield put(actions.submitRadioAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.submitRadioAction(e, 'ERROR'));
  }
}
function* confirmDeleteSaga(action) {
  try {
    const { index, callback, item } = action.payload;
    // console.log(action);
    const url = `/app/api/student/failed-questions/questions/${item.id}/understood?category=${item.category}`;
    const fetch = arg => Fetch.put(url, arg);
    const res = yield call(fetch);
    console.log('移除错题本', res);
    const { code } = res;
    if (code === 0) {
      callback();
      yield call(delay, 3000); // 试试等callback函数那边执行完后（那边的执行是2秒），再执行这边
      const state = yield select(getState);
      const { questions } = state.mistakeReformReducer;
      // 成功后删除
      const newQuestions = R.remove(index, 1, questions);
      yield put(actions.correctConfirmAction(newQuestions, 'SUCCESS')); // 目前没做什么操作
      // 成功后的回调
    } else {
      yield put(actions.correctConfirmAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.correctConfirmAction(e, 'ERROR'));
  }
}

function* objectiveSaga(action) {
  try {
    console.log('客观题saga', action.payload);
    const { index, item } = action.payload;
    // console.log(action);
    const state = yield select(getState);
    const startTime = moment(new Date()).format();
    const endTime = moment(new Date()).format();
    console.log(startTime, endTime);
    console.log(state.mistakeReformReducer.questions[index].controlComponent.objectiveAnswer.value);
    const params = {
      startTime,
      endTime,
      answer: state.mistakeReformReducer.questions[index].controlComponent.objectiveAnswer.value,
      // answerFileId: item.answerFileId, // 没有图片就不需要传
    };
    const url = `/app/api/student/failed-questions/${item.id}/answer?category=${item.category}`;
    const fetch = arg => Fetch.post(url, arg);
    const res = yield call(fetch, params);
    console.log(120, res);
    const { code } = res;
    let { data } = res;
    if (code === 0) {
      if (item.type === 3) {
        data = immer(data, (draft) => {
          // '1' 跟 '-1'
          draft.rightAnswer = draft.rightAnswer === '1' ? '对' : '错';
          draft.studentAnswer = draft.studentAnswer === '1' ? '对' : '错';
        });
      }
      // 如果答案正确，发送正确的action，反之发送错误的action
      if (data.right) {
        // 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题
        yield put(actions.showCorrectInfoAction({ result: data, index, showAnswer: true }));
      } else {
        yield put(actions.showWrongInfoAction({ result: data, index }));
      }
      // 这步是判断是否还要显示提交按钮，因为正确与错误信息显示以后，就不需要再显示提交按钮了
      yield put(actions.selectAnswerAction({ index }));
    } else {
      yield put(actions.submitAnswerAction(code, 'ERROR'));
    }
  } catch (error) {
    yield put(actions.submitAnswerAction(error, 'ERROR'));
  }
}
function* subjectiveSaga(action) {
  // 请求正确答案、别人答案
  try {
    const { index, item } = action.payload;
    console.log('主观题saga', action.payload);
    const state = yield select(getState);
    const { urlSource } = state.mistakeReformReducer.questions[index].controlComponent.showSubjectiveInfo;
    console.log(181, urlSource);
    // OSS的操作
    const { questionId, file, imgName } = urlSource;
    const imgNameType = imgName ? imgName.substring(imgName.lastIndexOf('.'), imgName.length) : '.png';
    const url = '/api/oss-upload-parameters';
    const fetch = (arg, type) => Fetch.post(url, arg, type);
    const res = yield call(fetch, {}, 'json');
    console.log('OSS第一步res=', res);
    const { code, data } = res;
    // 第二部
    if (code === 0) {
      const formData = new FormData();
      const i = {
        key: data.objectKey,
        OSSAccessKeyId: data.accessId,
        callback: data.callback,
        signature: data.signature,
        success_action_status: 200,
        policy: data.policy,
        'x:filename': 9 + imgNameType,
      };
      R.forEachObjIndexed((value, key) => {
        formData.append(key, value);
      })(i);
      formData.append('file', { uri: file, type: `image/${imgNameType}`, name: 9 + imgNameType }, 9 + imgNameType);
      const fetch2 = (arg, type) => Fetch.post(data.uploadUrl, arg, type);
      const res2 = yield call(fetch2, formData, 'file');
      const code2 = res2.code;
      const data2 = res2.data;
      // 第三部
      console.log('OSS第二部res2=', res2);
      if (code2 === 0) {
        const startTime = moment(new Date()).format();
        const endTime = moment(new Date()).format();
        const thirdParams = {
          startTime,
          endTime,
          answer: data2.url,
          answerFileId: data2.fileId,
        };
        const thirdUrl = `/app/api/student/failed-questions/${item.id}/answer?category=${item.category}`;
        console.log(220, thirdUrl);
        const thirdFetch = arg => Fetch.post(thirdUrl, arg);
        // const res333 = yield thirdFetch(thirdParams);
        // console.log('res333=', res333);
        const res3 = yield call(thirdFetch, thirdParams);
        console.log('OSS 第三部 res3=', res3);
        const code3 = res3.code;
        const data3 = res3.data;
        if (code3 === 0) {
          const studentAnswer = data3.answerFileUrl; // 截图的时候就有了
          const teacherAnswer = data3.explainImageUrl;
          const otherStudentAnswer = data3.classMatesAnswers;
          // if (otherStudentAnswer && otherStudentAnswer.length > 0) {
          //     for (let j = 0; j < otherStudentAnswer.length; j++) {
          //         let excellAnswer = {};
          //         excellAnswer.smallSrc = otherStudentAnswer[j].thumbUrl;
          //         excellAnswer.bigSrc = otherStudentAnswer[j].fileUrl;
          //         excellAnswer.studentName = otherStudentAnswer[j].studentName;
          //         excellAnswerImgArr.push(excellAnswer)
          //     }
          // }
          yield put(actions.fetchSubjectiveAnswerAction(
            {
              index, showAll: true, teacherAnswer, otherStudentAnswer, studentAnswer,
            },
            'SUCCESS',
          ));
          // 这步是判断是否还要显示提交按钮，因为正确与错误信息显示以后，就不需要再显示提交按钮了
          yield put(actions.selectAnswerAction({ index }));
        } else {
          yield put(actions.fetchSubjectiveAnswerAction(code, 'ERROR'));
        }
      }
    }
  } catch (error) {
    yield put(actions.fetchSubjectiveAnswerAction(error, 'ERROR'));
  }
}
