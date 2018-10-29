import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchListAction = actionCreator(types.FETCH_HOMEWORK_CORRECTING_LIST, '作业批阅-获作业list');
export const setCorrectResultAction = actionCreator(types.HOMEWORK_CORRECTING_SET_SCORE, '作业批阅-设置批阅分数');
export const saveCorrectResultAction = actionCreator(types.HOMEWORK_CORRECTING_SAVE_SCORE, '作业批阅-保存批阅分数');
export const controlFinsihBtnAction = actionCreator(types.HOMEWORK_CORRECTING_CONTROL_FINISH_BTN, '作业批阅-控制完成按钮');
