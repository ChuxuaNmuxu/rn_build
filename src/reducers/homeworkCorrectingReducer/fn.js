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
  // 点击 完成批阅 后将studentMarked字段置为1（学生已批改状态）
  if (finishBtnDisable) {
    state.list[index].studentMarked = 1;
  }
  state.list[index].finishBtnDisable = finishBtnDisable;
};
