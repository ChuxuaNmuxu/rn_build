export function fetchDataSuccess(state, action) {
  const newState = Object.assign({}, state, {
    data: action.payload,
  });
  return newState;
}
