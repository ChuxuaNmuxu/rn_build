import actionCreator from './actionCreator';
import {
  FETCH_INCORRECT_PROPBLEM_DETAIL,
  PUT_FAIL_PROBLEM_REASON,
  HOMEWORK_PROBLEM_DETAIL_INNITAIL_STATE,
} from '../constants/actionType';

export const getIncorrectInfo = actionCreator(FETCH_INCORRECT_PROPBLEM_DETAIL, '错题详情-获取错误习题的详情');
export const markFailReason = actionCreator(PUT_FAIL_PROBLEM_REASON, '错题详情-标记习题的错误原因');
export const initialState = actionCreator(HOMEWORK_PROBLEM_DETAIL_INNITAIL_STATE, '错题详情-返回清空数据');
