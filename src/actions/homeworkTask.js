import actionCreator from './actionCreator';
import {
  CHANGE_DROP_POSITION,
  GET_DROP_LISTENER_RANGE,
  CHANGE_PLAN_TASK,
  CHANGE_TODO_TASK,
  CHANGE_DRAG_INDEX,
  CHANGE_DRAGING_TASK_CORRESPOND_PERIOD,
  CHANGE_LAST_HANDLE_PERIOD_INDEX,
  REGET_DROP_LISTENER_RANGE,
  FETCH_STUDENT_TASK_LIST,
} from '../constants/actionType';

export const ChangeDropPosition = actionCreator(CHANGE_DROP_POSITION, '长按或响应事件结束之后改变drop的位置');
export const GetDropListenerRange = actionCreator(GET_DROP_LISTENER_RANGE, '获取时间段的监听范围');
export const ChangePlanTask = actionCreator(CHANGE_PLAN_TASK, '更改计划任务');
export const ChangeTodoTask = actionCreator(CHANGE_TODO_TASK, '更改待计划任务');
export const ChangeDropIndex = actionCreator(CHANGE_DRAG_INDEX, '更改正在拖动元素的索引');
export const ChangeDragingTaskCorrespondPeriod = actionCreator(CHANGE_DRAGING_TASK_CORRESPOND_PERIOD, '更改拖拽任务对应的时间段索引');
export const ChangeLastHandlePeriodIndex = actionCreator(CHANGE_LAST_HANDLE_PERIOD_INDEX, '更改最后一次操作时间段的索引');
export const RegetDropListenerRange = actionCreator(REGET_DROP_LISTENER_RANGE, '重新获取时间段的监听范围');
export const FetchStudentTaskList = actionCreator(FETCH_STUDENT_TASK_LIST, '获取学生作业列表');
