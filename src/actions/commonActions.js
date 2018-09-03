import {
  createAction,
} from 'redux-actions';
import {
  COMMON_MODAL_OPPEN_OR_CLOSE,
} from '../constants/actionType';

export const closeOrOppen = createAction(COMMON_MODAL_OPPEN_OR_CLOSE);
// // export const ChangeTheme = createAction(CHANGE_THEME);
// export const ChangeLanguage = createAction(CHANGE_LANGUAGE);
