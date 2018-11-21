import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  // 做作业数据
  data: {},
  uploadImgSuccess: 0, // 是否完成上传图片后改变题目数据的action,这里应该展示三种状态，0初始状态 1上传oss成功状态 2上传oss失败的状态
  needMark: -1, // 用来标识提交作业成功后是否有互批作业---提交作业成功后返回参数needMark为---0:没有互批作业, 1:有互批作业
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
  // 上传图片到oss失败后更改uploadImgSuccess状态
  UPLOAD_IMAGE_TOOSS_ERROR: fn.uploadImageToOssError,
  // 删除主观题或者客观题的解答图片
  DELETE_IMAGEURL_ANSWER_SUCCESS: fn.deleteImageUrlAnswerSuccess,
  // 成功提交作业
  SUBMIT_THIS_HOMEWORK_SUCCESS: fn.submitHomeworkSuccess,
  // 改变图片上传oss是否成功的状态
  UPDATE_UPLOAD_IMAGE_STATUS: fn.updateImageStatus,
};

const doHomeworkReducer = createReducer(initState, handle);

export default doHomeworkReducer;
