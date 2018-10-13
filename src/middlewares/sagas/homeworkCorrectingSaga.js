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
    let res = yield call(fetch);
    console.log(res);
    // 模拟数据
    res = {
      code: 0,
      total: 2,
      message: null,
      data: [
        {
          id: '500248291653451779',
          homeworkId: '500245896139636736',
          studentId: '419',
          questionId: '500245896835891200',
          content: '{"blocks":[{"key":"2np1r","text":"填空题啦啦啦啦啦啦啦啦啦啦","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          answerContent: '{"blocks":[{"key":"4lq56","text":"填空题答案零零零零","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          answerFileId: '500248521941712896',
          answerFileUrl: 'https://cjenv-dev.oss-cn-shenzhen.aliyuncs.com/hms/file/8901b40d58e540ada388fc7020a1bdba?Expires=1539400402&OSSAccessKeyId=LTAIuxJU6jVlXzeF&Signature=325YOqkLa1xtsBvIlMaytxo6HPA%3D&response-content-disposition=attachment%3B%20filename%3Dc7bf594b271448668d20204ff3c5f722.jpg%3Bfilename%2A%3DUTF-8%27%27c7bf594b271448668d20204ff3c5f722.jpg&response-content-type=image%2Fjpeg&fileId=500248521941712896',
          studentMarked: 1,
          studentMarkedResult: 2,
          studentMarkScore: 5,
          materialContent: '{"blocks":[{"key":"681f5","text":"材料哦啦啦啦啦啦啦啦啦","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          questionNum: '5',
          parentId: '500245896731033600',
          popInfo: {
            score: undefined,
            visible: false,
          },
        },
        {
          id: '500248291653451784',
          homeworkId: '500245896139636736',
          studentId: '419',
          questionId: '500245896944943104',
          content: '{"blocks":[{"key":"blf1q","text":"填空题哦哦哦哦哦","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          answerContent: '{"blocks":[{"key":"4qd4b","text":"填空题答案","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          answerFileId: '500248668243230720',
          answerFileUrl: 'https://cjenv-dev.oss-cn-shenzhen.aliyuncs.com/hms/file/f854180eb90b474eab81ca671bd856d5?Expires=1539400402&OSSAccessKeyId=LTAIuxJU6jVlXzeF&Signature=ZQb7tEdQJ5FG0%2F5hgSa1VIJqSkY%3D&response-content-disposition=attachment%3B%20filename%3Dda5fcad9344947e49dd462fb39a65e4a.jpg%3Bfilename%2A%3DUTF-8%27%27da5fcad9344947e49dd462fb39a65e4a.jpg&response-content-type=image%2Fjpeg&fileId=500248668243230720',
          studentMarked: 0,
          studentMarkedResult: null,
          studentMarkScore: 0,
          materialContent: null,
          questionNum: '10',
          parentId: '500245896848474112',
          popInfo: {
            score: undefined,
            visible: false,
          },
        },
      ],
    };
    const { code } = res;
    if (code === 0) {
      console.log(72, res.data[0].content, draftToHtml(res.data[0].content));
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
      studentId, homeworkId, questionId, score,
    } = action.payload;
    const url = `/app/api/student/homeworks/${studentId}/${homeworkId}/${questionId}/mark?score=${score}`;
    const fetch = arg => Fetch.post(url, arg);
    const res = yield call(fetch);
    console.log(res);
  } catch (e) {
    yield put(actions.saveCorrectResultAction(e, 'ERROR'));
  }
}
