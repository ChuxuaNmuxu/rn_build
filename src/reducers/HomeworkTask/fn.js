import R from 'ramda';

export const changeDropPositionReducer = (state, action) => {
  state.position = action.payload;
};

export const firstGetDropListenerRangeReducer = (state, action) => {
  state.isFirstGetDropListenerRange = action.payload;
};

export const getDropListenerReducer = (state, action) => {
  state.listenerRangeList = action.payload;
};

export const changePlanTask = (state, action) => {
  if (R.type(action.payload) === 'Array') {
    action.payload.forEach(v => state.planList.push(v));
  } else if (R.type(action.payload) === 'Object') {
    state.planList.push(action.payload);
  }
};

export const changeTodoTask = (state, action) => {
  if (R.type(action.payload) === 'Array') {
    action.payload.forEach(v => state.todoList.push(v));
  } else if (R.type(action.payload) === 'Object') {
    state.todoList.push(action.payload);
  }
};
