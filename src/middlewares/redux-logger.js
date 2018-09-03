import {
  createLogger,
} from 'redux-logger';
// import {
//   Iterable,
//   fromJS,
// } from 'immutable';

export default createLogger({
  duration: true,
  collapsed: true,
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
