import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchPersonalInfoAction = actionCreator(types.FETCH_PERSONAL_INFO, '请求学生的个人信息');
