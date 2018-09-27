/**
 * 创建 reducer 的 模板
 * http://cn.redux.js.org/docs/recipes/reducers/RefactoringReducersExample.html
 * @param {*} initialState
 * @param {*} handlers
 */
import immer from 'immer';

function createReducer(initialState, handlers) {
  // 前面这步只会使用一次
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return immer(state, (draft) => {
        // "ACTION_TYPE": function ===> function (state, action)
        // handlers[action.type] === function
        handlers[action.type](draft, action);
      });
    }
    return state;
  };
}

export default createReducer;
