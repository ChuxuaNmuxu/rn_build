import createReducer from '../createReducer';
import {
  INITIAL_CONFIG,
  // CHANGE_THEME,
  CHANGE_LANGUAGE,
  CHANGE_API_FLAG,
  IS_HOT_UPDATING,
} from '../../constants/actionType';
import * as fn from './fn';

const initial = {
  // theme: {},
  language: '',
  apiFlag: '',
  isHotUpdating: true,
};

const handle = {
  [CHANGE_LANGUAGE]: fn.changeLanguge,
  [CHANGE_API_FLAG]: fn.changeApiFlat,
  [INITIAL_CONFIG]: fn.initialConfig,
  [IS_HOT_UPDATING]: fn.changeHotUpdateStatus,
};

const common = createReducer(initial, handle);

export default common;
