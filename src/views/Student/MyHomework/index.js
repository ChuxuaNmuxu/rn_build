import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Layout from '../../Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class MyHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const navbarList = [
      {
        text: '我的作业',
        onClick: Actions.myHomework,
      },
      {
        text: '考试记录',
        onClick: Actions.examRecords,
      },
      {
        text: '作业记录',
        onClick: Actions.homeworkRecords,
      },
      {
        text: '错题本',
        onClick: Actions.wrongNotes,
      },
    ];
    return (
      <View style={styles.container}>
        <Layout navbarList={navbarList} />
        <Text>
我的作业
        </Text>
      </View>
    );
  }
}
