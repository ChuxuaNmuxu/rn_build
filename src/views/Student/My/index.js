import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Drag from '../../../components/Drag/test-1';
import Radio from '../../../components/Radio';
import styles from '../DoHomework/Components/AnswerCard.scss';
import styles2 from './style.sass';
import Task from '../HomeworkTask/component/Task';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const styles1 = StyleSheet.create({
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
      <View style={styles1.container}>
        <Text>
          我的
        </Text>
        <View style={styles2.wrap}>
          <View
            style={[styles2.box, {
              transform: [{
                rotateZ: '-45deg',
              }],
            }]}
          ><Text>已阅</Text>
          </View>
        </View>

        <Task />

        {/* <RadioGroup
          value={1}
          onChange={this.handleToClickRadio}
          style={styles.radio_wrapper}
          iconWrapStyle={styles.radioStyle}
          checkedIconWrapStyle={styles.checkedIconWrapStyle}
          textStyle={styles.radioTextStyle}
          checkedTextStyle={styles.checkedRadioTextStyle}
        >
          <RadioButton value={1}>√</RadioButton>
          <RadioButton value={-1}>×</RadioButton>
        </RadioGroup>
        <Drag /> */}
      </View>
    );
  }
}
