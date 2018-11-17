// 获取 竞争科目设置页面数据
export function getSubjectDataListSuccess(state, action) {
  state.subjectList = action.payload;
}
