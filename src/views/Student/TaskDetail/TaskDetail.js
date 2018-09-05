import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
 View,
 Text
} from 'react-native';
import styles from './TaskDetail.scss';

// title 组件
const Title = ({waitReadOver, title}) => {
  if (waitReadOver) {
    return (
      <Text style={styles.title}>{`${title}-批阅`}</Text>
    )
  }
  return <Text style={styles.title}>{title}</Text>
}
// 内容组件
const Content = ({waitReadOver, beginTime, endTime, useTime}) => {
  if (waitReadOver) {
    return (
      <View>
        <View style={styles.content_child}>
          <Text style={styles.content_child_left}>截止时间:</Text><Text style={styles.content_child_right}>{endTime}</Text>        
        </View>
        <View style={[styles.content_child_btn]}>
          <Text onPress={() => console.log('去批阅')} style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>去批阅</Text>
        </View>
      </View>
    )
  }
  return (
    <View>
      <View style={styles.content_child}>
        <Text style={styles.content_child_left}>预计耗时:</Text><Text style={styles.content_child_right}>{useTime}</Text>        
      </View>
      <View style={styles.content_child}>
        <Text style={styles.content_child_left}>截止时间:</Text><Text style={styles.content_child_right}>{endTime}</Text>
      </View>
      <View style={styles.content_child}>
        <Text style={styles.content_child_left}>执行日期:</Text><Text style={styles.content_child_right}>{beginTime}</Text>
      </View>
      <View style={[styles.content_child_btn]}>
        <Text onPress={() => console.log('预览作业')} style={styles.content_child_btn_normal}>预览作业</Text>
        <Text onPress={() => console.log('开始作业')} style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>开始作业</Text>
      </View>
    </View>
  );
}
class TaskDetail extends Component {
  componentDidMount () {
    console.log('调用TaskDetail组件！', this.props);
  }
  render() {
    const {
      title,
      useTime,
      endTime,
      beginTime,
      waitReadOver
    } = this.props;
    console.log(waitReadOver)
    return (
      <View style={styles.wrap}>
        <View style={styles.title_wrap}>
          <Title waitReadOver={waitReadOver} title={title} />
        </View>
        <View style={styles.content_wrap}>
            <Content beginTime={beginTime} endTime={endTime} waitReadOver={waitReadOver} useTime={useTime} />
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
  waitReadOver: PropTypes.bool
}
TaskDetail.defaultProps = {
  title: '6-22物理作业',
  useTime: '15分钟',
  endTime: '6-24 24:00',
  beginTime: '今天',
  waitReadOver: false
}

export default TaskDetail;