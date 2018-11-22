export const changeLanguge = (state, action) => {
  state.language = action.payload;
};

export const changeApiFlat = (state, action) => {
  state.apiFlag = action.payload;
};

export const initialConfig = (state, action) => {
  const {
    // theme,
    language,
    apiFlag,
  } = action.payload;
  // state.theme = theme;
  state.language = language;
  state.apiFlag = apiFlag;
};

export const changeHotUpdateStatus = (state, action) => {
  state.isHotUpdating = action.payload;
};
