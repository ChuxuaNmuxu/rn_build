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
    // action.payload.forEach(v => state.planList.unshift(v));
    state.planList = action.payload;
  } else if (R.type(action.payload) === 'Object') {
    if ('prevPeriodIndex' in action.payload) {
      //  切换排期
      const prevPeriodData = state.planList[action.payload.prevPeriodIndex];
      const currentPeriodData = state.planList[action.payload.currentPeriodIndex];
      const prevPeriodChildDragingIndex = prevPeriodData.data.findIndex(v => v.data === action.payload.data);
      prevPeriodData.data.splice(prevPeriodChildDragingIndex, 1);
      currentPeriodData.data.unshift(action.payload);
      delete action.payload.currentPeriodIndex;
      delete action.payload.prevPeriodIndex;
      return;
    }
    if ('leavePeriodIndex' in action.payload) {
      // 取消排期
      const periodData = state.planList[action.payload.leavePeriodIndex];
      const periodChildDragingIndex = periodData.data.findIndex(v => v.data === action.payload.data);
      periodData.data.splice(periodChildDragingIndex, 1);
      // todo 应该要通过事件来重新排序
      delete action.payload.leavePeriodIndex;
      return;
    }
    // 排期
    const current = state.planList[action.payload.currentPeriodIndex];
    delete action.payload.currentPeriodIndex;
    current.data.unshift(action.payload);
  }
};

export const changeTodoTask = (state, action) => {
  if (R.type(action.payload) === 'Array') {
    // action.payload.forEach(v => state.todoList.unshift(v));
    state.todoList = action.payload;
  } else if (R.type(action.payload) === 'Object') {
    if (action.payload.cancelTask) {
      // 排期
      const cancelTaskIndex = state.todoList.findIndex(v => v.homeworkId === action.payload.homeworkId);
      state.todoList.splice(cancelTaskIndex, 1);
      delete action.payload.cancelTask;
    } else {
      // 取消排期
      state.todoList.unshift(action.payload);
    }
  }
};

// 可以不传参数，如果不传默认设为null
export const changeDragingData = (state, action) => {
  if (action.payload || action.payload === 0) {
    state.dragData = action.payload;
  } else {
    state.dragData = {};
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