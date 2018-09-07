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
    const plainOptions = [
      { label: 'Apple1', value: 'Apple1' },
      { label: 'Apple2', value: 'Apple2' },
      { label: 'Apple3', value: 'Apple3' },
    ];
    return (
      <View style={styles.container}>
        {/* <Theme /> */}
        <Language />
        <Text style={{ fontSize: 100 }}>单选</Text>
        <Text>分组</Text>
        <Radio.Group>
          <Radio value={1}>A</Radio>
        </Radio.Group>

        <Text>options</Text>
        <Radio.Group options={plainOptions} onChange={this.onChangeRadio} value="Apple1" horizontal />

        <Radio.Group horizontal value={1} defaultValue={2}>
          <Radio.Button value={1}>A</Radio.Button>
          <Radio.Button value={2}>B</Radio.Button>
        </Radio.Group>

        <Text>未分组</Text>

        <Radio checked onChange={this.onChangeRadio}>未分组默认选中</Radio>


        <Radio onChange={this.onChangeRadio}>未分组不选中</Radio>


        <Text style={{ fontSize: 100 }}>多选</Text>

        {/* <Checkbox checked>多选哈</Checkbox> */}
        {/* <Radio size={4} onChange={this.onChangeRadio} checked={1} />
        <Text>多选</Text> */}
        {/* <Checkbox size={3} checkbox onChange={this.onChangeCheckbox} checked={[{ 0: false }, { 1: true }]} /> */}
        {/* <BoolSubject /> */}
      </View>
    );
  }
}
