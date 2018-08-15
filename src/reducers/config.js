import { handleActions } from 'redux-actions';
import {
  InitialConfog,
  ChangeTheme,
  ChangeLanguage,
} from '../actions/config';

const initialState = {
  theme: {},
  language: '',
};
export default handleActions({
  [ChangeTheme](state, action) {
    return {
      ...state,
      theme: action.payload,
    };
  },
  [ChangeLanguage](state, action) {
    return {
      ...state,
      language: action.payload,
    };
  },
  [InitialConfog](state, action) {
    const {
      theme,
      language,
    } = action.payload;
    return {
      ...state,
      theme,
      language,
    };
  },
}, initialState);
