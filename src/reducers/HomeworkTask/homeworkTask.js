import createReducer from '../createReducer';
import {
  CHANGE_DROP_POSITION,
  GET_DROP_LISTENER_RANGE,
  FIRST_GET_DROP_LISTENER_RANGE,
  CHANGE_PLAN_TASK,
  CHANGE_TODO_TASK,
} from '../../constants/actionType';
import * as fn from './fn';

const initial = {
  position: { // 拖拽任务的坐标值
    x: -500,
    y: 0,
  },
  isFirstGetDropListenerRange: true, // 是否第一次获取范围值
  listenerRangeList: [], // 待计划任务拖拽排期的范围监听
  todoList: [], // 待计划任务
  planList: [], // 已计划任务
};

const handle = {
  [CHANGE_DROP_POSITION]: fn.changeDropPositionReducer,
  [FIRST_GET_DROP_LISTENER_RANGE]: fn.firstGetDropListenerRangeReducer,
  [GET_DROP_LISTENER_RANGE]: fn.getDropListenerReducer,
  [CHANGE_PLAN_TASK]: fn.changePlanTask,
  [CHANGE_TODO_TASK]: fn.changeTodoTask,
};

const homeworkTask = createReducer(initial, handle);

export default homeworkTask;
