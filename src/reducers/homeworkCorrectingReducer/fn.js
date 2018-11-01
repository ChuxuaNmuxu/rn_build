export const fetchListSuccess = (state, action) => {
  console.log(action.payload);
  state.list = action.payload;
};
export const setScore = (state, action) => {
  console.log(action.payload);
  const { score, index } = action.payload;
  state.list[index].score = score;
};
export const controlFinishBtn = (state, action) => {
  console.log(action.payload);
  const { index, finishBtnDisable } = action.payload;
  state.list[index].finishBtnDisable = finishBtnDisable;
};
