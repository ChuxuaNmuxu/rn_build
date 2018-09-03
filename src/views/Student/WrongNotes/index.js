import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'antd-mobile-rn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Test3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onClick={() => Actions.login({ test: 'mmp' })}>BTN</Button>
        <Text>
错题本
        </Text>
      </View>
    );
  }
}
