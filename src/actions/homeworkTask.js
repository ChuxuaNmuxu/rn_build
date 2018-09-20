import actionCreator from './actionCreator';
import {
  CHANGE_DROP_LOCATION,
} from '../constants/actionType';

export const ChangeDropLocation = actionCreator(CHANGE_DROP_LOCATION, '长按或响应事件结束之后改变drop的位置');
