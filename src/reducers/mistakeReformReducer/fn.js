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
  const { index, showAnswer, result } = action.payload;
  state.questions[index].controlComponent.showCorrectInfo.showAll = true;
  state.questions[index].controlComponent.showCorrectInfo.showAnswer = showAnswer;
  state.questions[index].controlComponent.showCorrectInfo.result = result;
};

export const answerError = (state, action) => {
  const { index, result } = action.payload;
  // 显示错误的全部提示
  state.questions[index].controlComponent.showErrorInfo.showAll = true;
  state.questions[index].controlComponent.showErrorInfo.result = result;
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
  // 将图片地址直接放在questions下面的answerFileUrl字段下方便AnswerCard答案组件展示图片
  state.questions[index].answerFileUrl = urlSource.file;
};

export const changeSubjectiveShowall = (state, action) => {
  const {
    index, showAll, studentAnswer, teacherAnswer, otherStudentAnswer,
  } = action.payload;
  // 把那个可点击的隐藏掉
  state.questions[index].controlComponent.showSubjectiveInfo.showAll = showAll;
  state.questions[index].controlComponent.showSubjectiveInfo.studentAnswer = studentAnswer;
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

export const saveSingleSelect = (state, action) => {
  const { value, index } = action.payload;
  state.questions[index].controlComponent.objectiveAnswer.value = value;
};

export const confirmDelete = (state, action) => {
  state.questions = action.payload;
};
