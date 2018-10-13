import actionCreator from './actionCreator';
import {
  FETCH_MISTAKE_LIST,
} from '../constants/actionType';

export const getMistakeList = actionCreator(FETCH_MISTAKE_LIST, '获取错误习题列表');
