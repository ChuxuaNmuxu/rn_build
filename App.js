import React, { Component } from 'react';
import {
  Provider,
} from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';
import Router from './src';
import store from './src/store';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
