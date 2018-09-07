import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './problemRecords.scss';
// import Swiper from 'react-native-swiper';
import FilterBox from './Components/filterBox';
import RecordList from './recordList';
import I18nText from '../../../components/I18nText';

class ProblemRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRecordType: 0, // 默认为作业记录
      recordData: [{ // 记录的数据
        id: '0',
        subjectName: '语文',
        title: '语文作业',
        accuracy: '0.5882',
        resultRead: '0',
        publishTime: '2018-08-16T11:27:09+08:00',
      }, {
        id: '1',
        subjectName: '生物',
        title: '生物作业',
        accuracy: '0.4555',
        resultRead: '1',
        publishTime: '2018-08-16T11:27:09+08:00',
      }, {
        id: '2',
        subjectName: '化学',
        title: '化学作业',
        accuracy: '0.9866',
        resultRead: '0',
        publishTime: '2018-08-16T11:27:09+08:00',
      }, {
        id: '3',
        subjectName: '英语',
        title: '英语作业',
        accuracy: '0.2323',
        resultRead: '1',
        publishTime: '2018-09-03T11:27:09+08:00',
      }, {
        id: '4',
        subjectName: '音乐',
        title: '音乐作业',
        accuracy: '1',
        resultRead: '1',
        publishTime: '2018-09-03T11:27:09+08:00',
      }, {
        id: '5',
        subjectName: '物理',
        title: '物理作业',
        accuracy: '1',
        resultRead: '1',
        publishTime: '2018-09-03T11:27:09+08:00',
      }],
    };
  }

  componentDidMount() {
  }

  // 切换作业记录和考试记录
  switchRecord = (type) => {
    this.setState({
      currentRecordType: type,
    });
  }

  render() {
    const { currentRecordType, recordData } = this.state;
    return (
      <View style={styles.recordsContainer}>
        <View style={styles.recordsSwitch}>
          <TouchableOpacity
            style={[styles.recordBox, styles.homeWorkRecord, (currentRecordType === 0 && styles.currentRecord)]}
            onPress={() => this.switchRecord(0)}
          >
            <I18nText style={[styles.recordText, styles.homeWorkText, (currentRecordType === 0 && styles.currentText)]}>
              ProblemRecords.header.homeworkRecord
            </I18nText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.recordBox, styles.examRecord, (currentRecordType === 1 && styles.currentRecord)]}
            onPress={() => this.switchRecord(1)}
          >
            <I18nText style={[styles.recordText, styles.examText, (currentRecordType === 1 && styles.currentText)]}>
              ProblemRecords.header.exanRecord
            </I18nText>
          </TouchableOpacity>
        </View>
        <FilterBox />
        <RecordList dataList={recordData} />
      </View>
    );
  }
}

export default ProblemRecords;