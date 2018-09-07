import {
  createLogger,
} from 'redux-logger';
// import {
//   Iterable,
//   fromJS,
// } from 'immutable';
function titleFormatter(action, time, took) {
  const parts = [];
  if (action.info) parts.push(`${String(action.info)}`);
  parts.push(`${String(action.type)}`);
  // 暂时先用不着下面这两个
  // if (time) parts.push(`触发时间:${String(time)}`);
  // if (took) parts.push(`(耗时: ${took.toFixed(3)} ms)`);
  return parts.join('    ');
}

export default createLogger({
  duration: true,
  collapsed: true,
  titleFormatter,
  // stateTransformer: (state) => {
  //   const newState = {};

  //   for (const i of Object.keys(state)) {
  //     if (Iterable.isIterable(state[i])) {
  //       newState[i] = state[i].toJS();
  //     } else {
  //       newState[i] = fromJS(state[i]).toJS();
  //     }
  //   }

  //   return newState;
  // },
  // actionTransformer: (action) => {
  //   const newAction = Object.assign({}, action);

  //   if (newAction.payload) {
  //     if (Iterable.isIterable(newAction.payload)) {
  //       newAction.payload = newAction.toJS();
  //     } else {
  //       for (const i of Object.keys(newAction.payload)) {
  //         if (Iterable.isIterable(newAction.payload[i])) {
  //           newAction.payload[i] = newAction.payload[i].toJS();
  //         }
  //       }
  //     }
  //   }

  //   return newAction;
  // },
});
