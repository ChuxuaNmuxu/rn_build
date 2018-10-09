import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Drag from '../../../components/Drag/test';
import Radio from '../../../components/Radio';
import styles from '../DoHomework/Components/AnswerCard.scss';

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

        <RadioGroup
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
        <Drag />
      </View>
    );
  }
}
