import {
  createAction,
} from 'redux-actions';
import {
  INITIAL_CONFIG,
  CHANGE_THEME,
  CHANGE_LANGUAGE,
} from '../constants/action';

export const InitialConfog = createAction(INITIAL_CONFIG);
export const ChangeTheme = createAction(CHANGE_THEME);
export const ChangeLanguage = createAction(CHANGE_LANGUAGE);
