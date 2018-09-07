import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import styles from './HomeworkTask.scss';
import TaskItem from './TaskItem';
import TimeItem from './TimeItem';
import I18nText from '../../../components/I18nText';
import Drag from '../../../components/Drag';

class MyHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          <View style={styles.headle_left}>
            <I18nText style={styles.title} option={{ count: 10 }}>home.header.title</I18nText>
            <I18nText style={styles.small}>home.header.tip</I18nText>
          </View>
          <TouchableOpacity
            onPress={BackHandler.exitApp}
          >
            <I18nText style={styles.headle}>home.header.headle</I18nText>
          </TouchableOpacity>
        </View>
        <View style={styles.task_list_box}>
          <ScrollView horizontal style={styles.flex_1}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 34].map(item => <TaskItem key={item} />)
            }
          </ScrollView>
        </View>
        <Drag />
        <View style={styles.time_list_box}>
          <ScrollView horizontal>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 34].map(item => <TimeItem key={item} />)
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default MyHomework;