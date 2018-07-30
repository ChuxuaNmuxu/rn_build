import React, { Component, Fragment } from 'react';
import {
  WingBlank,
  // Steps,
  Icon,
  Button,
  Steps,
} from 'antd-mobile-rn';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import SvgUri from '../../../components/Svg';
import CIcon from '../../../components/Icon';
import Styles from './styles.scss';
import TodayTask from './TodayTask';
import TaskItem from './TaskItem';


class MyHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isTask = true;
    return (
      <View style={Styles.container}>
        <View style={[Styles.task_box, Styles.peer_review_task]}>
          <Text style={[Styles.color333, Styles.fontSize20]}>互批任务</Text>
          <Text>当前无互批任务</Text>
        </View>
        <View style={[Styles.task_box]}>
          <Text>计划一下今天完成哪些作业，把它们添加到今日任务吧</Text>
        </View>

        <View style={[Styles.task_box, Styles.distributed, !isTask && Styles.undistributed]}>
          {
          isTask
            ? (
              <Fragment>
                <View style={{ }}>
                  <TaskItem text="text" vertical="top" />
                </View>
                <TodayTask />
              </Fragment>
            )
            : (
              <SvgUri width="400" height="400" source="exam" />
            )
          }
        </View>
      </View>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(MyHomework);
