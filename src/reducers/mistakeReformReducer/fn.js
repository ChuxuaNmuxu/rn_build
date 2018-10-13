export const saveQuestions = (state, action) => {
  console.log(2, action);
  // 只需要按原生js写就好了，且不需要return出去！
  state.questions = action.payload;
};

export const selectAnswer = (state, action) => {
  const { index } = action.payload;
  // const newState = immer(state, (draft) => {
  const { showCorrectInfo, showErrorInfo, showSubjectiveInfo } = state.questions[index].controlComponent;
  if (!showCorrectInfo.showAll && !showErrorInfo.showAll && !showSubjectiveInfo.showAll) {
    state.questions[index].controlComponent.showSubmitBtn = true;
  } else {
    state.questions[index].controlComponent.showSubmitBtn = false;
  }
  // });
  // return newState;
};

export const answerCorrect = (state, action) => {
  const { index, showAnswer } = action.payload;
  state.questions[index].controlComponent.showCorrectInfo.showAll = true;
  state.questions[index].controlComponent.showCorrectInfo.showAnswer = showAnswer;
};

export const answerError = (state, action) => {
  const { index } = action.payload;
  // 显示错误的全部提示
  state.questions[index].controlComponent.showErrorInfo.showAll = true;
};

export const showAnswerErrorRadio = (state, action) => {
  const { index, showWord = false } = action.payload;
  // 把那个可点击的隐藏掉
  state.questions[index].controlComponent.showErrorInfo.showWord = showWord;
  // 显示出下面的单选radio
  state.questions[index].controlComponent.showErrorInfo.showRadio = true;
};

export const updateImage = (state, action) => {
  const { index, urlSource } = action.payload;
  // 把那个可点击的隐藏掉
  state.questions[index].controlComponent.showSubjectiveInfo.urlSource = urlSource;
};

export const changeSubjectiveShowall = (state, action) => {
  const {
    index, showAll, teacherAnswer, otherStudentAnswer,
  } = action.payload;
  // 把那个可点击的隐藏掉
  state.questions[index].controlComponent.showSubjectiveInfo.showAll = showAll;
  state.questions[index].controlComponent.showSubjectiveInfo.teacherAnswer = teacherAnswer;
  state.questions[index].controlComponent.showSubjectiveInfo.otherStudentAnswer = otherStudentAnswer;
};

export const controlSubjectButton = (state, action) => {
  const {
    index, showTrueOrFalseButton = false,
  } = action.payload;
  // 把那个可点击‘对的’'错的'隐藏掉
  state.questions[index].controlComponent.showSubjectiveInfo.showTrueOrFalseButton = showTrueOrFalseButton;
};
