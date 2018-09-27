// import immer from 'immer';
// import immutable from 'immutable';

export const fetchDataSuccess = (state, action) => {
  // 只需要按原生js写就好了，且不需要return出去！
  state.questions = action.payload;
  state.test.c.e.push('改变啦！');
};

export const selectAnswer = (state, action) => {
  const { index } = action.payload;
  // const newState = immer(state, (draft) => {
  const { showCorrectInfo, showErrorInfo } = state.questions[index].controlComponent;
  if (!showCorrectInfo.showAll && !showErrorInfo.showAll) {
    state.questions[index].controlComponent.showSubmitBtn = true;
  } else {
    state.questions[index].controlComponent.showSubmitBtn = false;
  }
  // });
  // return newState;
};

export const answerCorrect = (state, action) => {
  const { index } = action.payload;
  state.questions[index].controlComponent.showCorrectInfo = true;
};

export const answerError = (state, action) => {
  const { index } = action.payload;
  state.questions[index].controlComponent.showErrorInfo.showAll = true;
  state.questions[index].controlComponent.showErrorInfo.showWord = true;
};

export const showAnswerErrorRadio = (state, action) => {
  const { index } = action.payload;
  state.questions[index].controlComponent.showErrorInfo.showWord = false;
  state.questions[index].controlComponent.showErrorInfo.showRadio = true;
};
