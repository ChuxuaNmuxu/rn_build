import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import styles from './TaskDetail.scss';
import Title from './Components/Title';
import Content from './Components/Content';
import * as taskActions from '../../../actions/taskDetailAction';

class TaskDetail extends Component {
  componentDidMount() {
    console.log('调用TaskDetail组件！', this.props);
  }

  render() {
    const {
      title,
      useTime,
      endTime,
      waitReadOver,
      homeworkId,
      actions,
      previewed,
      taskType,
      beginTime,
      gameData,
    } = this.props;
    const newEndTime = taskType === 2 ? moment(endTime).add(7, 'day').format('YYYY-MM-DD HH:mm:ss') : endTime;

    return (
      <View style={styles.wrap}>
        <Title waitReadOver={waitReadOver} title={title} gameData={gameData} />
        <View style={styles.content_wrap}>
          <Content
            beginTime={beginTime}
            endTime={newEndTime}
            waitReadOver={waitReadOver}
            useTime={useTime}
            homeworkId={homeworkId}
            actions={actions}
            previewed={previewed}
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
  actions: PropTypes.object.isRequired,
  previewed: PropTypes.number,
  taskType: PropTypes.number,
  gameData: PropTypes.object, // 比赛数据
};
TaskDetail.defaultProps = {
  title: '6-22物理作业',
  useTime: '15分钟',
  endTime: '2018-10-28 23:59:59',
  beginTime: null, // 默认今天
  waitReadOver: false,
  homeworkId: '499598186277502976',
  previewed: 0,
  taskType: null,
  gameData: {},
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(taskActions, dispatch),
});


export default connect(null, mapDispatchToProps)(TaskDetail);
