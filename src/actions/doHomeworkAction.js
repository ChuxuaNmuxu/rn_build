// 做作业页面的相关操作
import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchdoHomeworkAction = actionCreator(types.FETCH_DOHOMEWORK_QUESTION, '请求做作业页面的数据');

export const submitDoHomeworkAnswerAction = actionCreator(types.SUBMIT_DOHOMEWORK_ANSWER, '提交所做题目的答案');

export const checkHomeworkAction = actionCreator(types.TOCHECK_HOMEWORK_QUESTION, '是否想检查作业');

export const saveHomeworkCheckTimeAction = actionCreator(types.TOSAVE_HOMEWORK_CHECKTIME, '保存检查耗时');

export const submitHomeworkAction = actionCreator(types.SUBMIT_THIS_HOMEWORK, '最终提交作业');

// 页面改变reducer数据操作
export const changeObjectiveAnswerAction = actionCreator(types.CHANGE_OBJECTIVE_ANSWER, '改变客观题答案');
export const changeDifficuiltLevelAction = actionCreator(types.CHANGE_QUESTION_DIFFICULTLEVEL, '改变题目难易程度');
export const changeNeedExplainStatusAction = actionCreator(types.CHANGE_NEEDEXPLAIN_STATUS, '是否需要老师讲解');
export const uploadImageToOssAction = actionCreator(types.UPLOAD_IMAGE_TOOSS, '上传图片到oss以获得图片fileId和url');
export const deleteImageUrlAnswwerAction = actionCreator(types.DELETE_IMAGEURL_ANSWER, '删除主观题或者客观题的图片答案');
export const updateImageStatusAction = actionCreator(types.UPDATE_UPLOAD_IMAGE_STATUS, '改变图片上传oss是否成功的状态--还原为0');
