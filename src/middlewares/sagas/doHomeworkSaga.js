import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import immer from 'immer';
import R from 'ramda';
import * as actions from '../../actions/doHomeworkAction';
import enhanceSaga from './enhanceSaga';

const getStateHomework = state => state.doHomeworkReducer.data;

export default function* doHomeworkSaga() {
  // 请求做作业页面的题目数据
  yield takeLatest('FETCH_DOHOMEWORK_QUESTION_REQUEST', enhanceSaga(fetchDoHomeworkSaga));
  // 提交答题数据
  yield takeLatest('SUBMIT_DOHOMEWORK_ANSWER_REQUEST', enhanceSaga(submitDoHomeworkAnswerSaga));
  // 批量答题（应用于多题）
  yield takeLatest('SUBMIT_MULTIPLE_ANSWER_REQUEST', enhanceSaga(submitMultipleAnswerSaga));
  // 第一次进入该份作业时弹窗判断是否想检查作业
  yield takeLatest('TOCHECK_HOMEWORK_QUESTION_REQUEST', enhanceSaga(checkHomeworkSaga));
  // 保存检查耗时
  yield takeLatest('TOSAVE_HOMEWORK_CHECKTIME_REQUEST', enhanceSaga(saveHomeworkCheckTimeSaga));
  // 提交作业
  yield takeLatest('SUBMIT_THIS_HOMEWORK_REQUEST', enhanceSaga(submitHomeworkSaga));
  // 改变客观题答案
  yield takeLatest('CHANGE_OBJECTIVE_ANSWER', enhanceSaga(changeObjectiveAnswerSaga));
  // 改变题目难易程度
  yield takeLatest('CHANGE_QUESTION_DIFFICULTLEVEL', enhanceSaga(changeDifficultLevelSaga));
  // 是否需要老师讲解
  yield takeLatest('CHANGE_NEEDEXPLAIN_STATUS', enhanceSaga(changeNeedExplainStatusSaga));
  // 一键上传图片到阿里云
  yield takeLatest('UPLOAD_IMAGE_TOOSS', enhanceSaga(uploadImageToOssSaga));
  // 删除主观题或者客观题的图片答案
  yield takeLatest('DELETE_IMAGEURL_ANSWER', enhanceSaga(deleteImageUrlAnswerSaga));
}

// 请求作业数据---optType(操作类型  1:预览 2:作答)
function* fetchDoHomeworkSaga(action) {
  try {
    const { homeworkId } = action.payload;
    const params = {};
    params.optType = 2;
    const url = `app/api/student/homeworks/${homeworkId}`;
    const fetch = arg => Fetch.get(url, arg);
    const res = yield call(fetch, params);
    const { code, data } = res;
    if (code === 0) {
      // 此处请求到接口的数据是大小题分层的，需要将大题的名称和材料内容统一加到下面的小题数据中以便展示,并将各小题数据全部放到finalQuestionList中让做作业页面使用
      // 大有材料时要增加smallQuesNum: 当前小题所在材料下的所有小题数，currentNum: 当前小题在大题中是第几小题
      const homeworkData = data;
      const finalQuestionList = [];
      for (let i = 0; i < homeworkData.questionList.length; i++) {
        let smallQuesNum = 0;
        smallQuesNum = homeworkData.questionList[i].childrenList.length;
        for (let j = 0; j < homeworkData.questionList[i].childrenList.length; j++) {
          homeworkData.questionList[i].childrenList[j].materialContent = homeworkData.questionList[i].content;
          homeworkData.questionList[i].childrenList[j].bigNumber = homeworkData.questionList[i].number;
          homeworkData.questionList[i].childrenList[j].bigTitle = homeworkData.questionList[i].title
          || homeworkData.questionList[i].type;
          finalQuestionList.push(homeworkData.questionList[i].childrenList[j]);
          if (homeworkData.questionList[i].content) {
            homeworkData.questionList[i].childrenList[j].smallQuesNum = smallQuesNum;
            homeworkData.questionList[i].childrenList[j].currentNum = j + 1;
          }
        }
      }
      homeworkData.finalQuestionList = finalQuestionList;
      // console.log(8997, homeworkData);
      yield put(actions.fetchdoHomeworkAction(homeworkData, 'SUCCESS'));
    } else {
      yield put(actions.fetchdoHomeworkAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.fetchdoHomeworkAction(e, 'ERROR'));
  }
}

// 提交所做题目的答案数据
function* submitDoHomeworkAnswerSaga(action) {
  try {
    const { homeworkId, id, answerParam } = action.payload;
    // 拿到了题目id再去请求接口
    if (id) {
      // console.log(77777, action.payload);
      // console.log(88888, answerParam);
      const url = `app/api/student/homeworks/${homeworkId}/questions/${id}/answer`;
      const fetch = (arg, type) => Fetch.put(url, arg, type);
      const res = yield call(fetch, answerParam, 'json');
      const { code } = res;
      // console.log(999999999, res);
      if (code === 0) {
        yield put(actions.submitDoHomeworkAnswerAction(code, 'SUCCESS'));
      } else {
        yield put(actions.submitDoHomeworkAnswerAction(code, 'ERROR'));
      }
    }
  } catch (error) {
    yield put(actions.submitDoHomeworkAnswerAction(error, 'ERROR'));
  }
}

// 批量答题---应用于多题---所用时间不计入单题时间，直接计入总时间中
function* submitMultipleAnswerSaga(action) {
  try {
    const { homeworkId, extraTimeSpent, answerParam } = action.payload;
    const url = `app/api/student/homeworks/${homeworkId}/answer?extraTimeSpent=${extraTimeSpent}`;
    const fetch = (arg, type) => Fetch.put(url, arg, type);
    const res = yield call(fetch, answerParam, 'json');
    const { code } = res;
    if (code === 0) {
      yield put(actions.submitMultipleAnswerAction(code, 'SUCCESS'));
    } else {
      yield put(actions.submitMultipleAnswerAction(code, 'ERROR'));
    }
  } catch (error) {
    yield put(actions.submitMultipleAnswerAction(error, 'ERROR'));
  }
}

// 用来标记是否想检查作业
function* checkHomeworkSaga(action) {
  try {
    const { homeworkId, checkStatus } = action.payload;
    const url = `app/api/student/homeworks/${homeworkId}/check?checkStatus=${checkStatus}`;
    const fetch = (arg, type) => Fetch.put(url, arg, type);
    const res = yield call(fetch, {}, 'json');
    const { code } = res;
    if (code === 0) {
      yield put(actions.checkHomeworkAction(code, 'SUCCESS'));
    } else {
      yield put(actions.checkHomeworkAction(code, 'ERROR'));
    }
  } catch (error) {
    yield put(actions.checkHomeworkAction(error, 'ERROR'));
  }
}

// 保存检查耗时
function* saveHomeworkCheckTimeSaga(action) {
  try {
    const { homeworkId, checkTime } = action.payload;
    const url = `app/api/student/homeworks/${homeworkId}/checktime/save?checkTime=${checkTime}`;
    const fetch = (arg, type) => Fetch.put(url, arg, type);
    const res = yield call(fetch, {}, 'json');
    const { code } = res;
    if (code === 0) {
      yield put(actions.saveHomeworkCheckTimeAction(code, 'SUCCESS'));
    } else {
      yield put(actions.saveHomeworkCheckTimeAction(code, 'ERROR'));
    }
  } catch (error) {
    yield put(actions.saveHomeworkCheckTimeAction(error, 'ERROR'));
  }
}

// 提交作业
function* submitHomeworkSaga(action) {
  try {
    const { homeworkId } = action.payload;
    const url = `app/api/student/homeworks/${homeworkId}/commit`;
    const fetch = (arg, type) => Fetch.post(url, arg, type);
    const res = yield call(fetch, {}, 'json');
    const { code, data } = res;
    if (code === 0) {
      // 添加一些模拟数据
      data.homeworkId = homeworkId;
      data.game = true; // 作业是否参与比赛
      data.gameResultSnapshot = { // 作业比赛结果
        gameName: '12-22历史作业', // 比赛名称
        accuracy: 0.5, // 客观题正确率
        gameType: 1, // 用户参加的比赛类型 比赛分组: 1.单人 2.双人 3.三人 10.漏选（未匹配到对手）
        groupResult: 1, // 小组比赛结果 0:没有结果 1:胜利 2:平手 3:失败
        personResult: 1, // 个人比赛结果 0没有结果（对手还未提交） 1胜利  2平手 3失败
        rivalAccuracy: 0.4, // 对手客观题正确率
      };
      yield put(actions.submitHomeworkAction(data, 'SUCCESS'));
    } else {
      yield put(actions.submitHomeworkAction(code, 'ERROR'));
    }
  } catch (error) {
    yield put(actions.submitHomeworkAction(error, 'ERROR'));
  }
}

// 改变客观题答案
function* changeObjectiveAnswerSaga(action) {
  try {
    const { questionId, answer } = action.payload;
    const state = yield select(getStateHomework);
    const homeworkData = immer(state, (draft) => {
      for (let i = 0; i < draft.finalQuestionList.length; i++) {
        if (draft.finalQuestionList[i].id === questionId) {
          draft.finalQuestionList[i].answered = 1;
          draft.finalQuestionList[i].studentAnswer = answer;
        }
      }
    });
    yield put(actions.changeObjectiveAnswerAction(homeworkData, 'SUCCESS'));
  } catch (e) {
    yield put(actions.changeObjectiveAnswerAction(e, 'ERROR'));
  }
}

// 改变难易程度
function* changeDifficultLevelSaga(action) {
  try {
    const { currentId, level } = action.payload;
    const state = yield select(getStateHomework);
    const homeworkData = immer(state, (draft) => {
      for (let i = 0; i < draft.finalQuestionList.length; i++) {
        if (draft.finalQuestionList[i].id === currentId) {
          draft.finalQuestionList[i].difficultyLevel = level;
        }
      }
    });
    yield put(actions.changeDifficuiltLevelAction(homeworkData, 'SUCCESS'));
  } catch (e) {
    yield put(actions.changeDifficuiltLevelAction(e, 'ERROR'));
  }
}

// 是否需要老师讲解
function* changeNeedExplainStatusSaga(action) {
  try {
    const { questionId, needsExplain } = action.payload;
    const state = yield select(getStateHomework);
    const homeworkData = immer(state, (draft) => {
      for (let i = 0; i < draft.finalQuestionList.length; i++) {
        if (draft.finalQuestionList[i].id === questionId) {
          draft.finalQuestionList[i].needsExplain = needsExplain;
        }
      }
    });
    yield put(actions.changeNeedExplainStatusAction(homeworkData, 'SUCCESS'));
  } catch (e) {
    yield put(actions.changeNeedExplainStatusAction(e, 'ERROR'));
  }
}

// 一键上传图片到阿里云
function* uploadImageToOssSaga(action) {
  try {
    const { questionId, file, imgName } = action.payload;
    const imgNameType = imgName ? imgName.substring(imgName.lastIndexOf('.'), imgName.length) : '.png';
    const url = '/api/oss-upload-parameters';
    const fetch = (arg, type) => Fetch.post(url, arg, type);
    const res = yield call(fetch, {}, 'json');
    const { code, data } = res;
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
      if (code2 === 0) {
        // 拿到上传成功后获得的fileId和图片url后去改变redux中的对应题目数据
        const state = yield select(getStateHomework);
        const homeworkData = immer(state, (draft) => {
          for (let j = 0; j < draft.finalQuestionList.length; j++) {
            if (draft.finalQuestionList[j].id === questionId) {
              draft.finalQuestionList[j].answered = 1;
              draft.finalQuestionList[j].answerFileId = data2.fileId;
              draft.finalQuestionList[j].answerFileUrl = data2.url;
            }
          }
        });
        yield put(actions.uploadImageToOssAction(homeworkData, 'SUCCESS'));
      } else {
        yield put(actions.uploadImageToOssAction(code2, 'ERROR'));
      }
    } else {
      yield put(actions.uploadImageToOssAction(code, 'ERROR'));
    }
  } catch (e) {
    yield put(actions.uploadImageToOssAction(e, 'ERROR'));
  }
}

// 删除主观题或者客观题的图片答案、
function* deleteImageUrlAnswerSaga(action) {
  try {
    const { questionId, type } = action.payload;
    const state = yield select(getStateHomework);
    const homeworkData = immer(state, (draft) => {
      for (let i = 0; i < draft.finalQuestionList.length; i++) {
        if (draft.finalQuestionList[i].id === questionId) {
          draft.finalQuestionList[i].answerFileId = '0';
          draft.finalQuestionList[i].answerFileUrl = null;
          // 主观题则需要将该题标识为未作答状态
          if (type > 4) {
            draft.finalQuestionList[i].answered = 0;
          }
        }
      }
    });
    yield put(actions.deleteImageUrlAnswwerAction(homeworkData, 'SUCCESS'));
  } catch (e) {
    yield put(actions.deleteImageUrlAnswwerAction(e, 'ERROR'));
  }
}
