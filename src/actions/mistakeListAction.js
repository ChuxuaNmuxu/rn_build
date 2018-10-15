import actionCreator from './actionCreator';
import {
  FETCH_MISTAKE_LIST,
  ADD_MISTAKE_LIST,
} from '../constants/actionType';

export const getMistakeList = actionCreator(FETCH_MISTAKE_LIST, '获取错误习题列表');
export const addMistakeList = actionCreator(ADD_MISTAKE_LIST, '新增错误习题列表');
