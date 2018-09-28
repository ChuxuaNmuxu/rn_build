export const fetchDataSuccess = (state, action) => {
  // 只需要按原生js写就好了，且不需要return出去！
  state.questions = action.payload;
  state.test.c = { f: { g: '改变后' } };
};

export const selectAnswer = (state, action) => {
  const { index } = action.payload;
  // const newState = immer(state, (draft) => {
  const { showCorrectInfo, showErrorInfo, showImageInfo } = state.questions[index].controlComponent;
  if (!showCorrectInfo.showAll && !showErrorInfo.showAll && !showImageInfo.showAll) {
    state.questions[index].controlComponent.showSubmitBtn = true;
  } else {
    state.questions[index].controlComponent.showSubmitBtn = false;
  }
  // });
  // return newState;
};

export const answerCorrect = (state, action) => {
  const { index } = action.payload;
  state.questions[index].controlComponent.showCorrectInfo.showAll = true;
  state.questions[index].controlComponent.showCorrectInfo.showWord = true;
};

export const answerError = (state, action) => {
  const { index } = action.payload;
  // 显示错误的全部提示
  state.questions[index].controlComponent.showErrorInfo.showAll = true;
  // 显示那个可点击的提示
  state.questions[index].controlComponent.showErrorInfo.showWord = true;
};

export const showAnswerErrorRadio = (state, action) => {
  const { index } = action.payload;
  // 把那个可点击的隐藏掉
  state.questions[index].controlComponent.showErrorInfo.showWord = false;
  // 显示出下面的单选radio
  state.questions[index].controlComponent.showErrorInfo.showRadio = true;
};

export const updateImage = (state, action) => {
  const { index, urlSource } = action.payload;
  // 把那个可点击的隐藏掉
  state.questions[index].controlComponent.showImageInfo.urlSource = urlSource;
};
