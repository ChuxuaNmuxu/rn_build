import { handleActions } from 'redux-actions';
import {
  InitialConfog,
  // ChangeTheme,
  ChangeLanguage,
  SetApiFlag,
} from '../../actions/config';

const initialState = {
  // theme: {},
  language: '',
  apiFlag: '',
};
export default handleActions({
  // [ChangeTheme](state, action) {
  //   return {
  //     ...state,
  //     theme: action.payload,
  //   };
  // },
  [ChangeLanguage](state, action) {
    return {
      ...state,
      language: action.payload,
    };
  },
  [SetApiFlag](state, action) {
    return {
      ...state,
      apiFlag: action.payload,
    };
  },

  [InitialConfog](state, action) {
    const {
      // theme,
      language,
      apiFlag,
    } = action.payload;
    return {
      ...state,
      // theme,
      language,
      apiFlag,
    };
  },
}, initialState);
