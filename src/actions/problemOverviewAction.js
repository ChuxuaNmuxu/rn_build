import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchDataAction = actionCreator(types.FETCH_PROBLEM_OVERVIEW, '请求错题本数据');
