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
      // todo 来重新排序
      const periodData = state.planList[action.payload.leavePeriodIndex];
      const periodChildDragingIndex = periodData.data.findIndex(v => v.data === action.payload.data);
      periodData.data.splice(periodChildDragingIndex, 1);
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
    state.todoList = action.payload;
  } else if (R.type(action.payload) === 'Object') {
    if (action.payload.cancelTask) {
      // 排期
      const cancelTaskIndex = state.todoList.findIndex(v => v.homeworkId === action.payload.homeworkId);
      state.todoList.splice(cancelTaskIndex, 1);
      delete action.payload.cancelTask;
    } else {
      // 取消排期

      // 查询当前任务类型首次出现的位置
      const findIndex = state.todoList.findIndex(v => v.taskType === action.payload.taskType);

      if (findIndex > 0) {
        state.todoList.splice(findIndex, 0, action.payload);
        console.log(70);
      } else if (findIndex === 0) {
        state.todoList.unshift(action.payload);
      } else {
        state.todoList.push(action.payload);
      }
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

export const isGetDropListenerRange = (state, action) => {
  state.isRegetDropListenerRange = action.payload;
};

export const isFirstGetDropListenerRange = (state, action) => {
  state.isFirstRegetDropListenerRange = action.payload;
};

export const isFirstOpenHomepage = (state, action) => {
  state.isFirstOpenHomepage = action.payload;
};

export const isManualCloseAchievementsBroadcast = (state, action) => {
  state.isManualCloseAchievementsBroadcast = action.payload;
};

export const getAchievementsBroadcast = (state, action) => {
  state.achievementsBroadcastData = action.payload;
};

export const changeAchievementsBroadcastStatus = (state, action) => {
  state.achievementsBroadcastStatus = action.payload;
};

export const changeAchievementsBroadcasCheckedId = (state, action) => {
  state.achievementsBroadcastId = action.payload;
};
