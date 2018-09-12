import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
// import Theme from '../../components/Theme';
import Language from '../../components/Language';
import Radio from '../../components/Radio';
import Checkbox from '../../components/Checkbox';
import LineTo from '../../components/LineTo';
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
    this.state = {
      part1Value: null,
    };
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
      <ScrollView style={styles.container}>
        {/* <Theme /> */}
        <Language />

        {/* <Text style={{ fontSize: 100 }}>对应题</Text> */}
        {/* <LineTo value={{ 1: 'D' }} /> */}
        <BoolSubject value={1} horizontal />


        {/* <Text style={{ fontSize: 100 }}>单选</Text>
        <Text>分组</Text>
        <Radio.Group>
          <Radio value={1}>A</Radio>
        </Radio.Group> */}

        <Text>options</Text>
        <Radio.Group options={plainOptions} childStyle={{ marginRight: 100 }} onChange={this.onChangeRadio} value="Apple1" horizontal />

        {/* <Radio.Group horizontal value={1} defaultValue={2}>
          <Radio.Button value={1}>A</Radio.Button>
          <Radio.Button value={2}>B</Radio.Button>
        </Radio.Group>

        <Text>未分组</Text>

        <Radio checked onChange={this.onChangeRadio}>未分组默认选中</Radio>

        <Radio onChange={this.onChangeRadio}>未分组不选中</Radio>
        <Radio.Button>B</Radio.Button>
        <Radio onChange={this.onChangeRadio}>未分组默认选中</Radio>
        <Radio.Group>传入字符串</Radio.Group>
        <Radio.Group />


        <Text style={{ fontSize: 100 }}>多选</Text>

        <Checkbox checked>多选哈</Checkbox>
        <Checkbox.Button>B</Checkbox.Button>
        <Checkbox.Group horizontal value={[1]} defaultValue={[1]}>
          <Checkbox.Button value={1}>A</Checkbox.Button>
          <Checkbox.Button value={2}>B</Checkbox.Button>
        </Checkbox.Group>
        <Checkbox.Group options={plainOptions} checkbox onChange={this.onChangeCheckbox} value={['Apple1', 'Apple2']} />
        <Checkbox.Group /> */}


      </ScrollView>
    );
  }
}
