import React, { Component } from 'react';
import {
  Button,
} from 'antd-mobile-rn';
import {
  Text,
  View,
  Image,
  stylesheet,
  ScrollView,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import SvgUri from '../../../components/Svg';
import CIcon from '../../../components/Icon';
import styles from './style.scss';
import docIcon from '../../../public/img/document.png';
import TaskItem from './TaskItem';
import TimeItem from './TimeItem';
import Drag from '../../../components/Drag';
import launchScreen from '../../../../android/app/src/main/res/drawable-xhdpi/launch_screen.png';
import Demo from '../../Demo';

class MyHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={launchScreen}
        style={styles.container}
      >
        <View style={[styles.header]}>
          <Text style={styles.title}>待计划任务：10项</Text>
          <Text style={styles.small}>请把下列任务安排一个合适的时间段开始吧</Text>
        </View>
        <View style={styles.task_list_box}>
          <ScrollView horizontal style={styles.flex_1}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 34].map(item => <TaskItem key={item} />)
            }
          </ScrollView>
        </View>

        <Demo />
        <Drag />
        {/* <View style={styles.time_list_box}>
          <ScrollView horizontal>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 34].map(item => <TimeItem key={item} />)
              }
            </View>
          </ScrollView>
        </View> */}
      </ImageBackground>
    );
  }
}

export default MyHomework;
