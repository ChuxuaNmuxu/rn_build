import {
  takeLatest, put,
} from 'redux-saga/effects';
// import api from '../../utils/fetch';
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
    console.log(action, '我是action快来see');
    // 模拟数据
    const code = 0;
    if (code === 0) {
      const data = {
        headerList: transFromExamHeaderList(),
        detailsDataList: transFromExamDetailsDataList(),
      };
      yield put(actions.fetchExaminationData(data, 'SUCCESS'));
    } else {
      // yield put(actions.fetchExaminationData(code, 'ERROR'));
    }
  } catch (e) {
    // yield put(actions.fetchExaminationData(e, 'ERROR'));
  }
}

function* fetchHomeworkListData(action) {
  try {
    console.log(action, '我是action快来see');
    const {
      // id,
      callback,
      // type,
    } = action.payload;
    // 模拟数据
    const code = 0;
    if (code === 0) {
      const data = {
        headerList: transFromHomeworkHeaderListDataList(),
        detailsDataList: transFromHomeworkDataList(0),
      };
      yield put(actions.fetchHomeworkListData(data, 'SUCCESS'));
      yield put(callback({ index: 0 }, 'REQUEST'));
    } else {
      // yield put(actions.fetchExaminationData(code, 'ERROR'));
    }
  } catch (e) {
    // yield put(actions.fetchExaminationData(e, 'ERROR'));
  }
}

function* fetchHomeworkData(action) {
  try {
    console.log(action, '我是action快来see');
    const {
      // id,
      index,
      // type,
    } = action.payload;
    // 模拟数据
    const code = 0;
    if (code === 0) {
      yield put(actions.fetchHomeworkData({ data: detailsDataList[index], index }, 'SUCCESS'));
    } else {
      // yield put(actions.fetchExaminationData(code, 'ERROR'));
    }
  } catch (e) {
    // yield put(actions.fetchExaminationData(e, 'ERROR'));
  }
}
// 操作状态-考试or练习-id-是否正确-题目类型客观or主观
const headerList = [
  {
    status: 0, type: 0, id: 1, isItCorrect: 0,
  },
  {
    status: 1, type: 0, id: 1, isItCorrect: 1,
  },
  {
    status: 2, type: 0, id: 1, isItCorrect: 2,
  },
  {
    status: 3, type: 0, id: 1, isItCorrect: 3,
  },
  {
    status: 4, type: 0, id: 1, isItCorrect: 0,
  },
  {
    status: 2, type: 0, id: 1, isItCorrect: 0,
  },

];
function transFromExamHeaderList() {
  return headerList;
}

const detailsDataList = [
  {
    // 富文本的
    htmlContent: '<p>我是一号</p>'
    + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    + 'alt="undefined" style="float:none;height: auto;width: auto"/>',
    // 中间的状态栏数据（其他需要的状态数据目测在header里面存在，到时转换一下就OK）
    AnserSummarizationData: {
      // 正确答案
      correctAnser: 'A',
      // 学生答案
      studentAnser: 'A',
      // 得分
      score: 30,
      // 题目类型
      questionType: 'obj',
      // 难易度
      difficultyDegree: 1,
    },
    studentAnserImage: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
    rightAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/389047947440685058.webp',
      },
    ],
    othersAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '李大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '王大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '狗大锤',
      },
    ],
    causeOfErrorNum: 1,
  },
  {
    // 富文本的
    htmlContent: '<p>我是2号</p>'
    + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    + 'alt="undefined" style="float:none;height: auto;width: auto"/>',
    // 中间的状态栏数据（其他需要的状态数据目测在header里面存在，到时转换一下就OK）
    AnserSummarizationData: {
      // 正确答案
      correctAnser: 'A',
      // 学生答案
      studentAnser: 'A',
      // 得分
      score: 30,
      // 题目类型
      questionType: 'sub',
      // 难易度
      difficultyDegree: 0,
    },
    studentAnserImage: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
    rightAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
      },
    ],
    othersAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '李大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '王大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '狗大锤',
      },
    ],
    causeOfErrorNum: 2,
  },
  {
    // 富文本的
    htmlContent: '<p>我是3号</p>'
    + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    + 'alt="undefined" style="float:none;height: auto;width: auto"/>',
    // 中间的状态栏数据（其他需要的状态数据目测在header里面存在，到时转换一下就OK）
    AnserSummarizationData: {
      // 正确答案
      correctAnser: 'ABCDEF',
      // 学生答案
      studentAnser: 'ABCDFE',
      // 得分
      score: 30,
      // 题目类型
      questionType: 'obj',
      // 难易度
      difficultyDegree: 0,
    },
    studentAnserImage: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
    rightAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
      },
    ],
    othersAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '李大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '王大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '狗大锤',
      },
    ],
    causeOfErrorNum: 3,
  },
  {
    // 富文本的
    htmlContent: '<p>我是4号</p>'
    + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    + 'alt="undefined" style="float:none;height: auto;width: auto"/>',
    // 中间的状态栏数据（其他需要的状态数据目测在header里面存在，到时转换一下就OK）
    AnserSummarizationData: {
      // 正确答案
      correctAnser: 'A',
      // 学生答案
      studentAnser: 'A',
      // 得分
      score: 30,
      // 题目类型
      questionType: 'sub',
      // 难易度
      difficultyDegree: 0,
    },
    studentAnserImage: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
    rightAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
      },
    ],
    othersAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '李大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '王大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '狗大锤',
      },
    ],
    causeOfErrorNum: 4,
  },
  {
    // 富文本的
    htmlContent: '<p>我是5号</p>'
    + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    + 'alt="undefined" style="float:none;height: auto;width: auto"/>',
    // 中间的状态栏数据（其他需要的状态数据目测在header里面存在，到时转换一下就OK）
    AnserSummarizationData: {
      // 正确答案
      correctAnser: 'A',
      // 学生答案
      studentAnser: 'A',
      // 得分
      score: 30,
      // 题目类型
      questionType: 'obj',
      // 难易度
      difficultyDegree: 0,
    },
    studentAnserImage: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
    rightAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
      },
    ],
    othersAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '李大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '王大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '狗大锤',
      },
    ],
    causeOfErrorNum: 5,
  },
  {
    // 富文本的
    htmlContent: '<p>我是6号</p>'
    + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    + 'alt="undefined" style="float:none;height: auto;width: auto"/>',
    // 中间的状态栏数据（其他需要的状态数据目测在header里面存在，到时转换一下就OK）
    AnserSummarizationData: {
      // 正确答案
      correctAnser: 'A',
      // 学生答案
      studentAnser: 'A',
      // 得分
      score: 30,
      // 题目类型
      questionType: 'sub',
      // 难易度
      difficultyDegree: 0,
    },
    studentAnserImage: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
    rightAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
      },
    ],
    othersAnser: [
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '李大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '王大锤',
      },
      {
        url: 'https://p9.pstatp.com/weili/l/384111071515115535.webp',
        studentName: '狗大锤',
      },
    ],
    causeOfErrorNum: 65535,
  },
];
function transFromExamDetailsDataList() {
  return detailsDataList;
}
/**
 * --------------------------------------------------------
 */
function transFromHomeworkDataList(index) {
  const arr = new Array(headerList.length).fill(null);
  arr[index] = detailsDataList[index];
  console.log(arr, 'detailsDataListdetailsDataListdetailsDataListdetailsDataListdetailsDataList');
  return arr;
}

function transFromHomeworkHeaderListDataList() {
  return headerList;
}
