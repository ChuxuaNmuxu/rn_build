import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchMyIndexAction = actionCreator(types.FETCH_MYINDEX_DATA, '请求我的页面数据--挑战次数，积分，团队贡献度');
