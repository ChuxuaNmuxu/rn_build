import React, { Component } from 'react';
import Router from './router';
import Resolution from './components/FontSize';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Resolution.FixWidthView>
        <Router />
      </Resolution.FixWidthView>
    );
  }
}
