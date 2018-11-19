// 请求接口做作业数据--此时将commitSuccessData还原为{}
export function fetchDataSuccess(state, action) {
  state.data = action.payload;
  state.commitSuccessData = {};
}

// 改变redux中所存数据对应客观题的答案
export function changeObjectiveAnswerSuccess(state, action) {
  state.data = action.payload;
}

// 改变redux中所存数据对应题目的难易程度
export function changeDifficultLevelSuccess(state, action) {
  state.data = action.payload;
}

// 是否需要老师讲解
export function changeNeedExplainStatusSuccess(state, action) {
  state.data = action.payload;
}

// 上传图片成功后将对应的图片id和地址url存到redux数据中
export function uploadImageToOssSuccess(state, action) {
  state.data = action.payload;
  state.uploadImgSuccess = true;
}

// 删除主观题或者填空题答案
export function deleteImageUrlAnswerSuccess(state, action) {
  state.data = action.payload;
}

// 成功提交答案--如果是提交的图片答案则要将uploadImgSuccess恢复为false
export function submitAnswerSuccess(state, action) {
  state.uploadImgSuccess = false;
}

// 提交作业成功后去改变redux中commitSuccessData值
export function submitHomeworkSuccess(state, action) {
  state.commitSuccessData = action.payload;
}
