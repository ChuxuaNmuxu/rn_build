import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import styles from './homeworkTask.scss';
import TaskList from './TaskList';
import TimeList from './TimeList';
import I18nText from '../../../components/I18nText';
// import Drag from '../../../components/Drag';

class MyHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeader = () => (
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
  )

  render() {
    return (
      <View style={styles.container}>
        {
          this.renderHeader()
        }
        <TaskList />
        {/* <Drag /> */}
        <TimeList />
      </View>
    );
  }
}

export default MyHomework;
