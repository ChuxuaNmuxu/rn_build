import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
// import Theme from '../../components/Theme';
import Language from '../../components/Language';
import Radio from '../../components/Radio';
import Checkbox from '../../components/Checkbox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    console.log(24, e);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Theme /> */}
        <Language />
        <Text>单选</Text>
        <Radio size={4} onChange={this.onChange}>A</Radio>
        <Text>多选</Text>
        <Checkbox>aaa</Checkbox>
      </View>
    );
  }
}
