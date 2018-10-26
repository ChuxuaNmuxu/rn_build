import {
  takeLatest, put, call,
} from 'redux-saga/effects';
// import api from '../../utils/fetch';
import _ from 'ramda';
import api from '../../utils/fetch';
import * as actions from '../../actions/recordDetailActions';
import enhanceSaga from './enhanceSaga';

export default function* recordDetailSaga() {
  // 请求考试数据
  yield takeLatest('FETCH_RECORD_DETAIL_EXAM_REQUEST', enhanceSaga(fetchExamData));
  // 请求作业数据头部
  yield takeLatest('FETCH_RECORD_DETAIL_HOMEWORK_LIST_REQUEST', enhanceSaga(fetchHomeworkListData));
  // 请求作业数据内容
  yield takeLatest('FETCH_RECORD_DETAIL_HOMEWORK_REQUEST', enhanceSaga(fetchHomeworkData));
}


function* fetchExamData(action) {
  try {
    console.log(action.payload, '我是action快来see');
    const { id } = action.payload;
    const url = `/app/api/student/exam/detail/${id}`;

    const fetch = params => api.get(url, params);
    const res = yield call(fetch);
    const { code, data } = res;
    console.log(res);
    // 模拟数据
    // const code = 0;
    if (code === 0) {
      const { isMarked, title } = data;
      const customData = {
        headerList: transFromExamHeaderList(data),
        detailsDataList: transFromExamdetailsDataList(data),
        status: isMarked ? 1 : 0,
        title,
      };
      yield put(actions.fetchExaminationData(customData, 'SUCCESS'));
    } else {
      // yield put(actions.fetchExaminationData(code, 'ERROR'));
    }
  } catch (e) {
    console.log(e);
    // yield put(actions.fetchExaminationData(e, 'ERROR'));
  }
}

function* fetchHomeworkListData(action) {
  try {
    console.log(action, '我是action快来see');
    // /app/api/student/homeworks/{homework-id}/overview
    const {
      id,
      callback,
      // type,
    } = action.payload;
    const url = `/app/api/student/homeworks/${id}/overview`;

    const fetch = params => api.get(url, params);
    const res = yield call(fetch);
    console.log(res, 'overviewoverviewoverview');
    const {
      code, data: { questionList, status, title },
    } = res;
    // 模拟数据
    // const code = 0;
    if (code === 0) {
      const data = {
        headerList: transFromHomeworkHeaderListDataList(questionList),
        // detailsDataList: transFromHomeworkDataList(0),
        title,
        // 按后端返回的字段来看，不是已批改的都是未批改
        status: status === 4 ? 1 : 0,
      };
      // headerArr = data.headerList;
      yield put(actions.fetchHomeworkListData(data, 'SUCCESS'));
      yield put(callback({
        homeworkId: id, questionId: questionList[0] && questionList[0].questionId, index: 0,
      }, 'REQUEST'));
    } else {
      // yield put(actions.fetchExaminationData(code, 'ERROR'));
    }
  } catch (e) {
    // yield put(actions.fetchExaminationData(e, 'ERROR'));
    console.log(e);
  }
}

function* fetchHomeworkData(action) {
  try {
    console.log(action, '我是action快来seaaae');
    const {
      homeworkId,
      questionId,
      index,
      // type,
    } = action.payload;
    const url = `/app/api/student/homeworks/${homeworkId}/questions/${questionId}`;

    const fetch = params => api.get(url, params);
    const res = yield call(fetch);
    console.log(res, '/app/api/student/homeworks/{homework-id}/questions/{que');
    const { code, data } = res;
    // 模拟数据
    // const code = 0;
    if (code === 0) {
      yield put(actions.fetchHomeworkData({ data: transFromHomeworkDataList(data), index }, 'SUCCESS'));
    } else {
      // yield put(actions.fetchExaminationData(code, 'ERROR'));
    }
  } catch (e) {
    // yield put(actions.fetchExaminationData(e, 'ERROR'));
  }
}
// 操作状态-考试or练习-id-是否正确-题目类型客观or主观
// * isItCorrect是区分状态：0错，1对，2对一丢丢，other number默认
// * state: 0是未提交，1教师操作过，2是学生操作过，3是机器操作过，4是未批改
// const headerList = [
//   {
//     id: 1, isItCorrect: 0,
//   },
//   {
//     id: 1, isItCorrect: 1,
//   },
//   {
//     id: 1, isItCorrect: 2,
//   },
//   {
//     id: 1, isItCorrect: 3,
//   },
//   {
//     id: 1, isItCorrect: 0,
//   },
//   {
//     id: 1, isItCorrect: 0,
//   },

// ];
function transFromExamHeaderList(data) {
  const { questionNums, studentExamQuestionDetailDtos } = data;
  if (_.isEmpty(questionNums)) {
    return [];
  }
  // const { questionNum, status } = questionNums;
  const a = questionNums.map(
    (item, index) => ({
      isItCorrect: item.status - 1,
      questionNum: item.questionNum,
      id: studentExamQuestionDetailDtos[index].questionId,
    }),
  );

  return a;
}

function transFromExamdetailsDataList(data) {
  const { studentExamQuestionDetailDtos, questionNums } = data;
  console.log(studentExamQuestionDetailDtos, questionNums);
  if (_.isEmpty(studentExamQuestionDetailDtos)) {
    return [];
  }
  const cusdata = [];
  questionNums.map((qitem) => {
    studentExamQuestionDetailDtos.map((item) => {
      if (qitem.questionNum === item.questionNum) {
        cusdata.push({
          htmlContent: item.questionContent,
          AnserSummarizationData: {
            // 正确答案
            correctAnser: item.answer,
            // 学生答案（客观题专用）
            studentAnser: item.studentAnswer,
            // 得分
            score: item.studentScore,
            // 题目类型 题目类型(0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题) ,
            questionType: (item.questionType === 10 || item.questionType === 11) ? 'sub' : 'obj',
            // 难易度(考试不展示难易度，写着先而已)
            difficultyDegree: 0,
          },
          // 主观题专用（学生答案）
          studentAnserImage: item.answerImageUrls === null ? [] : item.answerImageUrls.map(i => ({ url: `${i}` })),
          // 主观题专用（正确）
          rightAnser: item.answerExplain !== null ? item.answerExplain : '',
          // 其他同学的答案
          othersAnser: item.excellentAnswers instanceof Array ? item.excellentAnswers.map(o => ({
            url: o.answerFiles,
            studentName: o.studentName,
            smallUrl: o.answerFiles[0],
          })) : [],
          causeOfErrorNum: item.faultReason,
          // 没什么用，给测试看的题号
          questionNum: item.questionNum,
        });
      }
    });
  });

  return cusdata;
}

// const detailsDataList = [
//   {
//     // 富文本的
//     htmlContent: '<p>我是一号</p>'
//     + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
//     + 'alt="undefined" style="float:none;height: auto;width: auto"/>',
//     // 中间的状态栏数据（其他需要的状态数据目测在header里面存在，到时转换一下就OK）
//     AnserSummarizationData: {
//       // 正确答案
//       correctAnser: 'A',
//       // 学生答案
//       studentAnser: 'A',
//       // 得分
//       score: 30,
//       // 题目类型
//       questionType: 'obj',
//       // 难易度
//       difficultyDegree: 1,
//     },
//     studentAnserImage: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
//     rightAnser: [
//       {
//         url: 'https://p9.pstatp.com/weili/l/389047947440685058.webp',
//       },
//     ],
//     othersAnser: [
//       {
//         url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
//         studentName: '李大锤',
//       },
//       {
//         url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
//         studentName: '王大锤',
//       },
//       {
//         url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
//         studentName: '狗大锤',
//       },
//     ],
//     causeOfErrorNum: 1,
//   },
// ];
// function transFromExamDetailsDataList() {
//   return detailsDataList;
// }
/**
 * --------------------------------------------------------
 */
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
      // 学生是否批改
      studentMarked: data.studentMarked,
      // 学生是否反馈
      hasMarkFeedback: data.hasMarkFeedback,
    },
    // 学生zhu观题答案
    studentAnserImage: data.answerFileUrl === null ? [] : [{ url: `${data.answerFileUrl}` }],
    // 主观题专用正确答案
    rightAnser: data.answerContent !== null ? data.answerContent : '',
    // 其他同学的答案
    othersAnser: data.otherStudentAnswer instanceof Array ? data.otherStudentAnswer.map(o => ({
      url: [o.explainImageUrl],
      studentName: o.studentName,
      smallUrl: o.explainImageSmallUrl,
    })) : [],
    causeOfErrorNum: data.failReason,
  };
}

function transFromHomeworkHeaderListDataList(questionList) {
  if (_.isEmpty(questionList)) {
    return [];
  }
  const a = questionList.map(
    item => ({
      isItCorrect: getisItCorrect(item.score),
      questionNum: item.number,
      id: item.questionId,
    }),
  );
  return a;
}

function getisItCorrect(score) {
  // (item.score === 0 && 0) || ((item.score >= 1 || item.score <= 9) && 2) || (item.score === 10 && 1),
  if ((score === 0)) {
    return 0;
  }
  if (score >= 1 && score <= 9) {
    return 2;
  }
  return 1;
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
