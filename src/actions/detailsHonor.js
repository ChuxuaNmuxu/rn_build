/**
 * 荣誉详情包含
 * 积分、挑战次数、团队奉献度
 */
import { GET_DETAILS_HONOR } from '../constants/actionType';
import actionCreator from './actionCreator';

export const GetDetailsHonor = actionCreator(GET_DETAILS_HONOR, '荣誉详情，积分、挑战次数、团队奉献度公用一个reducers通过action参数判断');
