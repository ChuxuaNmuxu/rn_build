import createReducer from '../createReducer';
import {
  CHANGE_DROP_POSITION,
  GET_DROP_LISTENER_RANGE,
  IS_GET_DROP_LISTENER_RANGE,
} from '../../constants/actionType';
import * as fn from './fn';

const initial = {
  position: {
    x: -500,
    y: 0,
  },
  isGetDropListenerRange: true,
  listenerRangeList: [],
};

const handle = {
  [CHANGE_DROP_POSITION]: fn.changeDropPositionReducer,
  [IS_GET_DROP_LISTENER_RANGE]: fn.isGetDropListenerRangeReducer,
  [GET_DROP_LISTENER_RANGE]: fn.getDropListenerReducer,
};

const homeworkTask = createReducer(initial, handle);

export default homeworkTask;
