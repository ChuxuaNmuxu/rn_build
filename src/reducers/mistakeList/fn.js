export const getMistakeList = (state, action) => {
  const { data } = action.payload;
  state.mistakeList = data;
};

export const addMistakeList = (state, action) => {
  const { data } = action.payload;
  // console.log(7, data);
  state.mistakeList = [...state.mistakeList, ...data];
};
