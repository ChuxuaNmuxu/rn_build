
export function fetchExamDataSuccess(state, action) {
  const {
    headerList, detailsDataList, status, title, submitStatus,
  } = action.payload;
  state.headerList = headerList;
  state.detailsDataList = detailsDataList;
  state.status = status;
  state.title = title;
  state.submitStatus = submitStatus;
}

export function initailState(state) {
  state.headerList = [];
  state.detailsDataList = [];
}

export function fetchHomeworkListDataSuccess(state, action) {
  const { headerList, status, title } = action.payload;
  state.headerList = headerList;
  state.status = status;
  state.title = title;
  state.detailsDataList = new Array(headerList.length).fill(null);
}

export function fetchHomeworkDataSuccess(state, action) {
  const { data, index } = action.payload;
  state.detailsDataList[index] = data;
}
