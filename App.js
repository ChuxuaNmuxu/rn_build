import React, { Component } from 'react';
import {
  Provider,
  connect,
} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Router from './src/router';
import store from './src/store';
import Resolution from './src/components/FontSize';

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
          <RouterWithRedux />
        </Resolution.FixWidthView>
      </Provider>
    );
  }
}
