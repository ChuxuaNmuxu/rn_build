import createReducer from '../createReducer';
import {
  CHANGE_DROP_POSITION,
  GET_DROP_LISTENER_RANGE,
  CHANGE_PLAN_TASK,
  CHANGE_TODO_TASK,
  CHANGE_DRAG_INDEX,
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
};

const handle = {
  [CHANGE_DROP_POSITION]: fn.changeDropPositionReducer,
  [GET_DROP_LISTENER_RANGE]: fn.getDropListenerReducer,
  [CHANGE_PLAN_TASK]: fn.changePlanTask,
  [CHANGE_TODO_TASK]: fn.changeTodoTask,
  [CHANGE_DRAG_INDEX]: fn.changeDragingIndex,
};

const homeworkTask = createReducer(initial, handle);

export default homeworkTask;
