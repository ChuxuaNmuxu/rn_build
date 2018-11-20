// 获取 积分排名数据
export function getIntegraltDataListSuccess(state, action) {
  state.integralDta = action.payload;
}
// 获取 贡献度排名数据
export function getContributionDataListSuccess(state, action) {
  state.contributionData = action.payload;
}
