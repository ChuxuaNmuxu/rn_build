import createReducer from '../createReducer';
import {
  CHANGE_DROP_LOCATION,
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
  [CHANGE_DROP_LOCATION]: fn.changeDropLocationReducer,
};

const homeworkTask = createReducer(initial, handle);

export default homeworkTask;
