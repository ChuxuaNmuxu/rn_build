import createReducer from '../createReducer';
import {
  CHANGE_DROP_POSITION,
  GET_DROP_LISTENER_RANGE,
  CHANGE_PLAN_TASK,
  CHANGE_TODO_TASK,
  CHANGE_DRAG_INDEX,
  CHANGE_DRAGING_TASK_CORRESPOND_PERIOD,
  CHANGE_LAST_HANDLE_PERIOD_INDEX,
  REGET_DROP_LISTENER_RANGE,
} from '../../constants/actionType';
import * as fn from './fn';

const initial = {
  position: { // 拖拽任务的坐标值
    x: -500,
    y: 0,
  },
  listenerRangeList: [], // 待计划任务拖拽排期的范围监听
  todoList: [], // 待计划任务
  planList: [], // 已计划任务
  dragIndex: null, // 正在拖拽元素的索引
  dragingTaskCorrespondPeriodIndex: null, // 拖拽中的元素与时间对应的索引
  lastHandlePeriodIndex: null, // 最后操作时间段的索引
  isRegetDropListenerRange: false, // 是否重新获取时间段监听范围
};

const handle = {
  [CHANGE_DROP_POSITION]: fn.changeDropPositionReducer,
  [GET_DROP_LISTENER_RANGE]: fn.getDropListenerReducer,
  [CHANGE_PLAN_TASK]: fn.changePlanTask,
  [CHANGE_TODO_TASK]: fn.changeTodoTask,
  [CHANGE_DRAG_INDEX]: fn.changeDragingIndex,
  [CHANGE_DRAGING_TASK_CORRESPOND_PERIOD]: fn.changeDragingTaskCorrespondPeriod,
  [CHANGE_LAST_HANDLE_PERIOD_INDEX]: fn.changeLastHandlePeriodIndex,
  [REGET_DROP_LISTENER_RANGE]: fn.regetDropListenerRange,
};

const homeworkTask = createReducer(initial, handle);

export default homeworkTask;
