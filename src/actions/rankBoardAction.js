import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchIntegraltDataAction = actionCreator(types.FETCH_INTEGRALT_DATA_LIST, '获取积分排行榜数据');

export const fetchContributionDataAction = actionCreator(types.FETCH_CONTRIBUTION_DATA_LIST, '获取贡献度排行榜数据');
