export const changeDropPositionReducer = (state, action) => {
  const newState = Object.assign({}, state, {
    position: action.payload,
  });
  return newState;
};

export const isGetDropListenerRangeReducer = (state, action) => {
  state.homeworkTask.isGetDropListenerRange = action.payload;
};

export const GetDropListenerReducer = (state, action) => {
  state.homeworkTask.listenerRangeList = action.payload;
};
