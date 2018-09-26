// 作业记录详情页
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { CustomButton } from '../../../components/Icon';
import styles from './HomworkRecordDetail.scss';

class HomworkRecordDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.homeworkDetail_container}>
        <View style={styles.homeworkDetail_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.ProblemRecords} />
          <Text style={styles.homeworkDetailTitle}>作业记录详情</Text>
          <Text />
        </View>
      </View>
    );
  }
}

export default HomworkRecordDetail;
