export const getIncorrectInfo = (state, action) => {
  const { data, id } = action.payload;
  state.problems[id] = data;
};
