import {
  createAction,
} from 'redux-actions';
import {
  INITIAL_CONFIG,
  // CHANGE_THEME,
  CHANGE_LANGUAGE,
  SET_API_FLAG,
} from '../constants/actionType';

export const InitialConfog = createAction(INITIAL_CONFIG);
// export const ChangeTheme = createAction(CHANGE_THEME);
export const ChangeLanguage = createAction(CHANGE_LANGUAGE);
export const SetApiFlag = createAction(SET_API_FLAG);
