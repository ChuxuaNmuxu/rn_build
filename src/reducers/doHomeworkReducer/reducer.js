import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 做作业数据
  data: {},
  uploadImgSuccess: false, // 是否完成上传图片后改变题目数据的action
  commitSuccessData: {}, // 作业提交成功后返回的数据，如是否有互批作业needMark,是否参与比赛game及比赛结果数据等
};

const handle = {
  // 成功请求到做作业数据
  FETCH_DOHOMEWORK_QUESTION_SUCCESS: fn.fetchDataSuccess,
  // 成功提交答案
  SUBMIT_DOHOMEWORK_ANSWER_SUCCESS: fn.submitAnswerSuccess,
  // 成功改变reducer对应客观题的答案数据
  CHANGE_OBJECTIVE_ANSWER_SUCCESS: fn.changeObjectiveAnswerSuccess,
  // 成功改变reducer对应题目的难易程度数据
  CHANGE_QUESTION_DIFFICULTLEVEL_SUCCESS: fn.changeDifficultLevelSuccess,
  // 成功改变是否需要老师讲解
  CHANGE_NEEDEXPLAIN_STATUS_SUCCESS: fn.changeNeedExplainStatusSuccess,
  // 上传图片成功后去改变对应题目的解答答案
  UPLOAD_IMAGE_TOOSS_SUCCESS: fn.uploadImageToOssSuccess,
  // 删除主观题或者客观题的解答图片
  DELETE_IMAGEURL_ANSWER_SUCCESS: fn.deleteImageUrlAnswerSuccess,
  // 成功提交作业
  SUBMIT_THIS_HOMEWORK_SUCCESS: fn.submitHomeworkSuccess,
};

const doHomeworkReducer = createReducer(initState, handle);

export default doHomeworkReducer;
