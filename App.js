import React from 'react';
import {
  Provider,
  connect,
} from 'react-redux';
import { TextInput, Text } from 'react-native';
import Router from './src/router';
import store from './src/store';
import Resolution from './src/components/Resolution';
import Setup from './src/Setup';

// 通过修改TextInput、Text组件的defaultProps来使其不随系统字体大小的变化而变化，避免布局混乱
// https://www.jianshu.com/p/d2f9ce14127a
TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { defaultProps: false });
Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false });

// state => ({ theme: state.config.theme })
const RouterWithRedux = connect()(Router);

const App = () => (
  <Provider store={store}>
    <Resolution>
      <Setup>
        <RouterWithRedux />
      </Setup>
    </Resolution>
  </Provider>
);
export default App;
