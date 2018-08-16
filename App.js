import React from 'react';
import {
  Provider,
  connect,
} from 'react-redux';
import Router from './src/router';
import store from './src/store';
import Resolution from './src/components/Resolution';
import Setup from './src/Setup';

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
