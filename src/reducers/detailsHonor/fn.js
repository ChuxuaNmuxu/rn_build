export const getDetailsHonorReducers = (state, action) => {
  const { pieChart, scrollList } = action.payload;
  state.pieChart = pieChart;
  state.scrollList = scrollList;
};
