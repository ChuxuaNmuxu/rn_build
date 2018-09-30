// // 科目
// subjectData: [],
// // 记录数据
// recordData: [],
// // 年级
// allGrade: [],
// // 批改状态
// recordStateData: [],
// // 修正状态
// isRevising: [],
export function fetchInitailDataSuccess(state, action) {
  const {
    subjectData, recordData, allGrade, recordStateData, isRevising,
  } = action.payload;
  state.subjectData = subjectData;
  state.recordData = recordData;
  state.allGradeData = allGrade;
  state.recordStateData = recordStateData;
  state.isRevisingData = isRevising;
}

export function fetchDropDownRefreshDataSuccess(state, action) {
  const {
    recordData,
  } = action.payload;
  state.recordData = [...state.recordData, ...recordData];
}

// fetchChangeParamsRefreshDataSuccess

export function fetchChangeParamsRefreshDataSuccess(state, action) {
  const {
    recordData,
  } = action.payload;
  state.recordData = recordData;
}
