import R from 'ramda';

export const changeDropPositionReducer = (state, action) => {
  state.position = action.payload;
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
    if ('prevPeriodIndex' in action.payload) {
      //  切换排期
      const prevPeriodData = state.planList[action.payload.prevPeriodIndex];
      const currentPeriodData = state.planList[action.payload.currentPeriodIndex];
      const prevPeriodChildDragingIndex = prevPeriodData.data.findIndex(v => v.item.data === action.payload.item.data);
      prevPeriodData.data.splice(prevPeriodChildDragingIndex, 1);
      currentPeriodData.data.push(action.payload);
      delete action.payload.currentPeriodIndex;
      delete action.payload.prevPeriodIndex;
      return;
    }
    if ('leavePeriodIndex' in action.payload) {
      const periodData = state.planList[action.payload.leavePeriodIndex];
      const periodChildDragingIndex = periodData.data.findIndex(v => v.item.data === action.payload.item.data);
      periodData.data.splice(periodChildDragingIndex, 1);
      // todo 应该要通过事件来重新排序
      delete action.payload.leavePeriodIndex;
      // 取消排期
      return;
    }
    // 排期
    const current = state.planList[action.payload.currentPeriodIndex];
    delete action.payload.currentPeriodIndex;
    current.data.push(action.payload);
  }
};

export const changeTodoTask = (state, action) => {
  if (R.type(action.payload) === 'Array') {
    action.payload.forEach(v => state.todoList.push(v));
  } else if (R.type(action.payload) === 'Object') {
    // 取消排期

    state.todoList.push(action.payload.item);
  } else if (R.type(action.payload) === 'Number') {
    // 排期
    state.todoList.splice(action.payload, 1);
  }
};

// 可以不传参数，如果不传默认设为null
export const changeDragingIndex = (state, action) => {
  if (action.payload || action.payload === 0) {
    state.dragIndex = action.payload;
  } else {
    state.dragIndex = null;
  }
};

export const changeDragingTaskCorrespondPeriod = (state, action) => {
  if (action.payload || action.payload === 0) {
    state.dragingTaskCorrespondPeriodIndex = action.payload;
  } else {
    state.dragingTaskCorrespondPeriodIndex = null;
  }
};

export const changeLastHandlePeriodIndex = (state, action) => {
  state.lastHandlePeriodIndex = action.payload;
};

export const regetDropListenerRange = (state, action) => {
  state.isRegetDropListenerRange = action.payload;
};
