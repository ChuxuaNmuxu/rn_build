import createReducer from '../createReducer';
import * as fn from './fn';

const initState = {
  integralDta: [], // 积分排名数据
  contributionData: [], // 贡献度排名数据
};

const handle = {
  FETCH_INTEGRALT_DATA_LIST_SUCCESS: fn.getIntegraltDataListSuccess,
  FETCH_CONTRIBUTION_DATA_LIST_SUCCESS: fn.getContributionDataListSuccess,
};

export default createReducer(initState, handle);
