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

// console.ignoredYellowBox = ['Warning: BackAndroid is deprecated.  Please use BackHandler instead.',
//     'source.uri should not be an empty string','Remote debugger is in a background tab which',
//     'Setting a timer',
//     'Encountered two children with the same key,',
//     'Attempt to read an array index',
// ];

// AppRegistry.registerComponent('SaiYa', () => index);
