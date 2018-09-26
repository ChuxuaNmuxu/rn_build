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
    draft.questions[index].controlComponent.showSubmitBtn = true;
  });
  return newState;
};

export const submitAnswer = (state, action) => {
  const { index } = action.payload;
  const newState = immer(state, (draft) => {
    draft.questions[index].controlComponent.showSubmitBtn = false;
  });
  return newState;
};
