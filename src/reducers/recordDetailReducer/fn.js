
export function fetchExamDataSuccess(state, action) {
  const { headerList, detailsDataList } = action.payload;
  const newState = Object.assign({}, state, {
    headerList,
    detailsDataList,
  });
  return newState;
}

export function fetchHomeworkListDataSuccess(state, action) {
  const newState = Object.assign({}, state, {
    headerList: action.payload,
  });
  return newState;
}

export function fetchHomeworkDataSuccess(state, action) {
  const newState = Object.assign({}, state, {
    detailsDataList: action.payload,
  });
  return newState;
}
