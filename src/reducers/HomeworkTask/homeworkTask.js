import createReducer from '../createReducer';
import {
  CHANGE_DROP_POSITION,
} from '../../constants/actionType';
import * as fn from './fn';

const initial = {
  position: {
    x: -500,
    y: 0,
  },
  dragRef: null,
};

const handle = {
  [CHANGE_DROP_POSITION]: fn.changeDropPositionReducer,
};

const homeworkTask = createReducer(initial, handle);

export default homeworkTask;
