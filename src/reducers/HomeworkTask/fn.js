export const changeDropPositionReducer = (state, action) => {
  state.position = action.payload;
};

export const firstGetDropListenerRangeReducer = (state, action) => {
  state.isFirstGetDropListenerRange = action.payload;
};

export const getDropListenerReducer = (state, action) => {
  state.listenerRangeList = action.payload;
};
