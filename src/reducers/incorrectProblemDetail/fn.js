export const getIncorrectInfo = (state, action) => {
  const {
    cusData, index, isInit, len,
  } = action.payload;
  if (isInit === 'Y') {
    state.detailDataList = new Array(len).fill(null);
  }
  state.detailDataList[index] = cusData;
  console.log(state.detailDataList, 'state.detailDataList');
};

export const initailState = (state) => {
  state.detailDataList = [];
};
