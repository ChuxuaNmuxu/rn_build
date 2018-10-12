
export function fetchExamDataSuccess(state, action) {
  const { headerList, detailsDataList } = action.payload;
  state.headerList = headerList;
  state.detailsDataList = detailsDataList;
}

export function initailState(state) {
  state.headerList = [];
  state.detailsDataList = [];
}

export function fetchHomeworkListDataSuccess(state, action) {
  const { headerList, detailsDataList } = action.payload;
  state.headerList = headerList;
  state.detailsDataList = detailsDataList;
}

export function fetchHomeworkDataSuccess(state, action) {
  const { data, index } = action.payload;
  state.detailsDataList[index] = data;
}
