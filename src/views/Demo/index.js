import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
// import Theme from '../../components/Theme';
import Language from '../../components/Language';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Theme /> */}
        <Language />
      </View>
    );
  }
}
