import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const getMistakeListAction = actionCreator(types.FETCH_MISTAKE_LIST, '错题列表页-获取错误习题列表');
export const addMistakeList = actionCreator(types.ADD_MISTAKE_LIST, '错题列表页-新增错误习题列表');
export const initStateAction = actionCreator(types.HOMEWORK_PROBLEM_DETAIL_INNITAIL_LIST, '错题列表页-初始化数据');
