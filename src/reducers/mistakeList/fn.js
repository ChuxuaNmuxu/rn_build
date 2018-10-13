export const getMistakeList = (state, action) => {
  const { data } = action.payload;
  state.mistakeList = data;
};
