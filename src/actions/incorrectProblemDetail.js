import actionCreator from './actionCreator';
import {
  FETCH_INCORRECT_PROPBLEM_DETAIL,
  PUT_FAIL_PROBLEM_REASON,
} from '../constants/actionType';

export const getIncorrectInfo = actionCreator(FETCH_INCORRECT_PROPBLEM_DETAIL, '获取错误习题的详情');
export const markFailReason = actionCreator(PUT_FAIL_PROBLEM_REASON, '标记习题的错误原因');
