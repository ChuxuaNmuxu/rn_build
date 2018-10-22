export const getMistakeListSuccess = (state, action) => {
  const { data, total } = action.payload;
  state.mistakeList = data;
  state.total = total;
};

export const addMistakeList = (state, action) => {
  const { data } = action.payload;
  // console.log(7, data);
  state.mistakeList = [...state.mistakeList, ...data];
};
