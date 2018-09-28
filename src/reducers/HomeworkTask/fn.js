export const changeDropPositionReducer = (state, action) => {
  state.position = action.payload;
};

export const isGetDropListenerRangeReducer = (state, action) => {
  state.isGetDropListenerRange = action.payload;
};

export const GetDropListenerReducer = (state, action) => {
  console.log(10, state);
  state.listenerRangeList = [action.payload];
};
