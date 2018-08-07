import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class ArrangeHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
        ArrangeHomework
        </Text>
        <View style={{ backgroundColor: 'pink', width: 72, height: 72 }} />
      </View>
    );
  }
}
