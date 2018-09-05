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
import BoolSubject from '../../components/BoolSubject';

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

  onChangeRadio = data => console.log(25, data)

  onChangeCheckbox = data => console.log(29, data)

  render() {
    return (
      <View style={styles.container}>
        {/* <Theme /> */}
        <Language />

        <Text>分组</Text>
        <Radio.Group onChange={this.onChangeRadio} value={1} defaultValue={2}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>

        <Radio.Group onChange={this.onChangeRadio} value={1} defaultValue={2}>
          <Radio.Button value={1}>A</Radio.Button>
          <Radio.Button value={2}>B</Radio.Button>
        </Radio.Group>

        {/* <Text>无分组</Text> */}
        {/* <Radio onChange={this.onChangeRadio}>A</Radio> */}

        {/* <Radio size={4} onChange={this.onChangeRadio} checked={1} />
        <Text>多选</Text> */}
        {/* <Checkbox size={3} checkbox onChange={this.onChangeCheckbox} checked={[{ 0: false }, { 1: true }]} /> */}
        {/* <BoolSubject /> */}
      </View>
    );
  }
}
