import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Provider,
  connect,
} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Router from './src/router';
import store from './src/store';
import Resolution from './src/components/Resolution';

const RouterWithRedux = connect()(Router);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <Resolution.FixWidthView>
          <StatusBar
            backgroundColor="blue"
            translucent
            hidden
            animated
          />
          <RouterWithRedux />
        </Resolution.FixWidthView>
      </Provider>
    );
  }
}
