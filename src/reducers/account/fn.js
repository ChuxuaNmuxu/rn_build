export const setUserInfo = (state, action) => {
  if (action.payload) {
    state.userInfo = JSON.parse(action.payload);
  } else {
    state.userInfo = {};
  }
};
