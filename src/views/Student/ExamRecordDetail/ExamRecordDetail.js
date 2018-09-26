// 考试记录详情页
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { CustomButton } from '../../../components/Icon';
import styles from './ExamRecordDetail.scss';

class ExamRecordDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.examDetail_container}>
        <View style={styles.examDetail_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.ProblemRecords} />
          <Text style={styles.examDetailTitle}>考试记录详情</Text>
          <Text />
        </View>
      </View>
    );
  }
}

export default ExamRecordDetail;
