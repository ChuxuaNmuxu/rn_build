import actionCreator from './actionCreator';
import {
  CHANGE_DROP_POSITION,
} from '../constants/actionType';

export const ChangeDropPosition = actionCreator(CHANGE_DROP_POSITION, '长按或响应事件结束之后改变drop的位置');
