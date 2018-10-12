import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchListAction = actionCreator(types.FETCH_HOMEWORK_CORRECTING_LIST, '作业批阅-获作业list');
