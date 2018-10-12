import actionCreator from './actionCreator';
import {
  COMMON_MODAL_OPPEN_OR_CLOSE,
  WRONG_REASON_RETURN_FAIL_REASON,
} from '../constants/actionType';

export const closeOrOppen = actionCreator(COMMON_MODAL_OPPEN_OR_CLOSE);
// // export const ChangeTheme = createAction(CHANGE_THEME);
// export const ChangeLanguage = createAction(CHANGE_LANGUAGE);
export const returnFailReason = actionCreator(WRONG_REASON_RETURN_FAIL_REASON, '发送错误原因啦啦啦啦');
