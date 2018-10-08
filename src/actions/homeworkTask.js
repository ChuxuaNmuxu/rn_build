import actionCreator from './actionCreator';
import {
  CHANGE_DROP_POSITION,
  GET_DROP_LISTENER_RANGE,
  CHANGE_PLAN_TASK,
  CHANGE_TODO_TASK,
  CHANGE_DRAG_INDEX,
} from '../constants/actionType';

export const ChangeDropPosition = actionCreator(CHANGE_DROP_POSITION, '长按或响应事件结束之后改变drop的位置');
export const GetDropListenerRange = actionCreator(GET_DROP_LISTENER_RANGE, '获取时间段的监听范围');
export const ChangePlanTask = actionCreator(CHANGE_PLAN_TASK, '更改计划任务');
export const ChangeTodoTask = actionCreator(CHANGE_TODO_TASK, '更改待计划任务');
export const ChangeDropIndex = actionCreator(CHANGE_DRAG_INDEX, '更改正在拖动元素的索引');
