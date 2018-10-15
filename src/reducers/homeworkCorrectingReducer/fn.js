export const fetchListSuccess = (state, action) => {
  console.log(action.payload);
  state.list = action.payload;
};
export const setScore = (state, action) => {
  console.log(action.payload);
  const { score, index } = action.payload;
  state.list[index].popInfo.score = score;
};
