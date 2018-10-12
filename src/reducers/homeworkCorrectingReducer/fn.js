export const fetchListSuccess = (state, action) => {
  console.log(action.payload);
  state.list = action.payload;
};
