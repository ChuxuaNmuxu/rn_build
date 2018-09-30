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

/**
 * 第一次请求过来的数据会发送一个数组过来，之后的修改都是发送一个对象
 *
 * 数据为对象：
 *    数据里面会有一个标识，表示当前任务是否已排期。
 *      已排期任务：
 *        已排期说明是要“移除”这个元素，未排期表示要“添加”这个元素
 *      未排期任务：
 *        已排期说明是要“添加”这个元素，未排期表示要“移除”这个元素
 */
export const changePlanTask = (state, action) => {
  if (R.type(action.payload) === 'Array') {
    action.payload.forEach(v => state.planList.push(v));
  } else if (R.type(action.payload) === 'Object') {
    state.planList.push(action.payload);
  }
  console.log(31, action.payload);
};

export const changeTodoTask = (state, action) => {
  if (R.type(action.payload) === 'Array') {
    action.payload.forEach(v => state.todoList.push(v));
  } else if (R.type(action.payload) === 'Object') {
    // 暂时不考虑取消排期，所以暂时只做排除
    // 当前下标保存在data中
    state.todoList.splice(action.payload.data, 1);
  }
};
