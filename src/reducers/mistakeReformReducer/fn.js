import immer from 'immer';

export const fetchDataSuccess = (state, action) => {
  const newState = immer(state, (draft) => {
    draft.questions = action.payload;
  });
  return newState;
};

export const selectAnswer = (state, action) => {
  const { index } = action.payload;
  const newState = immer(state, (draft) => {
    const { showCorrectInfo, showErrorInfo } = draft.questions[index].controlComponent;
    if (!showCorrectInfo && !showErrorInfo) {
      draft.questions[index].controlComponent.showSubmitBtn = true;
    } else {
      draft.questions[index].controlComponent.showSubmitBtn = false;
    }
  });
  return newState;
};

export const answerCorrect = (state, action) => {
  const { index } = action.payload;
  const newState = immer(state, (draft) => {
    draft.questions[index].controlComponent.showCorrectInfo = true;
  });
  return newState;
};

export const answerError = (state, action) => {
  const { index } = action.payload;
  const newState = immer(state, (draft) => {
    draft.questions[index].controlComponent.showErrorInfo = true;
  });
  return newState;
};
