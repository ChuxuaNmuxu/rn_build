// import immer from 'immer';
// import immutable from 'immutable';

export const fetchDataSuccess = (state, action) => {
  // 只需要按原生js写就好了，且不需要return出去！
  state.questions = action.payload;
  state.test.c.d = '改变啦！';
  // return state;
};

export const selectAnswer = (state, action) => {
  const { index } = action.payload;
  // const newState = immer(state, (draft) => {
  const { showCorrectInfo, showErrorInfo } = state.questions[index].controlComponent;
  if (!showCorrectInfo && !showErrorInfo) {
    state.questions[index].controlComponent.showSubmitBtn = true;
  } else {
    state.questions[index].controlComponent.showSubmitBtn = false;
  }
  // });
  // return newState;
};

export const answerCorrect = (state, action) => {
  const { index } = action.payload;
  // const newState = immer(state, (draft) => {
  state.questions[index].controlComponent.showCorrectInfo = true;
  // });
  // return newState;
};

export const answerError = (state, action) => {
  const { index } = action.payload;
  // const newState = immer(state, (draft) => {
  state.questions[index].controlComponent.showErrorInfo = true;
  // });
  // return newState;
};
