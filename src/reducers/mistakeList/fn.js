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

export const control = (state, action) => {
  // console.log(7, data);
  state.controlFetch = action.payload;
};

export const initList = (state, action) => {
  // console.log(7, data);
  state.mistakeList = [];
};
