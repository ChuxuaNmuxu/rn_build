
export function fetchExamDataSuccess(state, action) {
  const { headerList, detailsDataList } = action.payload;
  // const newState = Object.assign({}, state, {
  //   headerList,
  //   detailsDataList,
  // });
  // return newState;
  state.headerList = headerList;
  state.detailsDataList = detailsDataList;
}

export function fetchHomeworkListDataSuccess(state, action) {
  // const newState = Object.assign({}, state, {
  //   headerList: action.payload,
  // });
  // return newState;
  state.headerList = action.payload;
}

export function fetchHomeworkDataSuccess(state, action) {
  // const newState = Object.assign({}, state, {
  //   detailsDataList: action.payload,
  // });
  // return newState;
  state.detailsDataList = action.payload;
}
