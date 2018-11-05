import {
  takeLatest,
} from 'redux-saga/effects';
import enhanceSaga from './enhanceSaga';
import {
  NAVIGATION_BACK,
  REACT_NATIVE_ROUTER_FLUX_FOCUS,
  REACT_NATIVE_ROUTER_FLUX_BLUR,
} from '../../constants/actionType';

export default function* listenerRouterSaga() {
  yield takeLatest(NAVIGATION_BACK, enhanceSaga(listenerBack));
  yield takeLatest(REACT_NATIVE_ROUTER_FLUX_BLUR, enhanceSaga(listenerLeave));
  yield takeLatest(REACT_NATIVE_ROUTER_FLUX_FOCUS, enhanceSaga(listenerEnter));
}

// 监听进入路由
function* listenerEnter(action) {
  const { routeName } = action;

  switch (routeName) {
    case 'HomeworkTask': // 跳转至首页
      break;
    default:
      break;
  }

  yield setTimeout(() => {
    console.log('listener');
  });
}

// 监听离开路由
function* listenerLeave(action) {
  const { routeName } = action;

  switch (routeName) {
    case 'HomeworkTask': // 跳转至首页
      break;
    default:
      break;
  }

  yield setTimeout(() => {
    console.log(action);
  });
}

// 监听虚拟按键的返回路由
function* listenerBack() {
  yield setTimeout(() => {
    console.log('Back');
  });
}
