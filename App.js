import React, { Component, Fragment } from 'react';
import { StatusBar } from 'react-native';
import {
  Provider,
  connect,
} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Immersive } from 'react-native-immersive';
import Router from './src/router';
import store from './src/store';
import Resolution from './src/components/Resolution/test';

const RouterWithRedux = connect()(Router);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 全屏组件，只支持Android
    // if (Android) {
    //   this.restoreImmersive = () => {
    //     Immersive.on();
    //     Immersive.setImmersive(true);
    //   };
    // }
  }

  componentDidMount() {
    // if (Android) {
    //   Immersive.addImmersiveListener(this.restoreImmersive);
    // }
    SplashScreen.hide();
  }

  componentWillUnmount() {
    // if (Android) {
    //   Immersive.removeImmersiveListener(this.restoreImmersive);
    // }
  }

  render() {
    return (
      <Provider store={store}>
        <Resolution>
          {/* <Fragment> */}
          <StatusBar
            hidden
          />
          <RouterWithRedux />
          {/* </Fragment> */}
        </Resolution>
      </Provider>
    );
  }
}
