import actionCreator from './actionCreator';
import {
  FETCH_INCORRECT_PROPBLEM_DETAIL,
} from '../constants/actionType';

export const getIncorrectInfo = actionCreator(FETCH_INCORRECT_PROPBLEM_DETAIL, '获取错误习题的详情');
