import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import styles from './TaskDetail.scss';
import Title from './Components/Title';
import Content from './Components/Content';
import { formatTimeToshow } from '../../../utils/common';

class TaskDetail extends Component {
  componentDidMount() {
    console.log('调用TaskDetail组件！', this.props);
  }

  render() {
    const {
      title,
      useTime,
      endTime,
      beginTime,
      waitReadOver,
      homeworkId,
    } = this.props;
    return (
      <View style={styles.wrap}>
        <Title waitReadOver={waitReadOver} title={title} />
        <View style={styles.content_wrap}>
          <Content
            beginTime={beginTime}
            endTime={endTime}
            waitReadOver={waitReadOver}
            useTime={useTime}
            homeworkId={homeworkId}
          />
        </View>
      </View>
    );
  }
}

TaskDetail.propTypes = {
  // 标题
  title: PropTypes.string,
  // 耗时
  useTime: PropTypes.string,
  // 结束时间
  endTime: PropTypes.string,
  // 执行时间
  beginTime: PropTypes.string,
  // 是否待批阅(默认false，如果是true 则是待批阅)
  waitReadOver: PropTypes.bool,
  homeworkId: PropTypes.string,
};
TaskDetail.defaultProps = {
  title: '6-22物理作业',
  useTime: '15分钟',
  endTime: '9-20 24:00',
  beginTime: formatTimeToshow(new Date()), // 默认今天
  waitReadOver: false,
  homeworkId: '499598186277502976',
};

export default TaskDetail;
