import actionCreator from './actionCreator';
import {
  INITIAL_CONFIG,
  // CHANGE_THEME,
  CHANGE_LANGUAGE,
  CHANGE_API_FLAG,
  IS_HOT_UPDATING,
} from '../constants/actionType';

export const InitialConfog = actionCreator(INITIAL_CONFIG, '初始化配置语言和api环境');
// export const ChangeTheme = actionCreator(CHANGE_THEME, '更改主题');
export const ChangeLanguage = actionCreator(CHANGE_LANGUAGE, '更改语言');
export const SetApiFlag = actionCreator(CHANGE_API_FLAG, '更改api环境');
export const ChangeHotUpdateStatus = actionCreator(IS_HOT_UPDATING, '更改更新状态');
