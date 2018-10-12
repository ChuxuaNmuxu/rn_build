// 预览作业页面的相关操作
import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchPreviewHomeworkAction = actionCreator(types.FETCH_PREVIEWHOMEWORK_QUESTION, '请求预览作业页面的数据');

export const checkHomeworkAction = actionCreator(types.CHECK_HOMEWORK_ISOPERABLE, '检查作业是否可做');
