export const changeDropLocationReducer = (state, action) => {
  const newState = Object.assign({}, state, {
    position: action.payload,
  });
  return newState;
};
