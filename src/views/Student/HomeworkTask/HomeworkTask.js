import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { merge } from 'ramda';
import { bindActionCreators } from 'redux';
import styles from './homeworkTask.scss';
import TaskList from './TaskList';
import TimeList from './TimeList';
import I18nText from '../../../components/I18nText';
import Drag from './Drag';
import { createHalfHourPeriod, currentTimeToPeriod } from '../../../utils/common';
import { ChangePlanTask, ChangeTodoTask } from '../../../actions/homeworkTask';

@connect((state) => {
  const {
    homeworkTaskReducer: {
      position,
    },
  } = state;
  return {
    position,
  };
}, dispatch => ({
  onChangePlanTask: bindActionCreators(ChangePlanTask, dispatch),
  onChangeTodoTask: bindActionCreators(ChangeTodoTask, dispatch),
}))
class HomeworkTask extends Component {
  constructor(props) {
    super(props);
    this.periods = createHalfHourPeriod(); // 生成半小时时间段数组
    this.currentPeriodIndex = currentTimeToPeriod(); // 获取当前时间段
    this.state = {};
  }

  componentDidMount() {
    const { onChangePlanTask, onChangeTodoTask } = this.props;
    const planListData = Array(20).fill({}).map((v, i) => (merge(v, {
      data: i,
    })));

    const todoListData = this.periods.map(v => ({
      data: v,
      currentPeriod: this.periods[this.currentPeriodIndex],
    }));

    setTimeout(() => {
      console.log('模拟请求');
      onChangePlanTask(planListData);
      onChangeTodoTask(todoListData);
    }, 10000);
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
    const {
      position,
    } = this.props;

    return (
      <View style={styles.container}>
        {
          this.renderHeader()
        }
        <TaskList />
        <Drag position={position} wrapStyle={{ backgroundColor: 'pink' }} />
        <TimeList />
      </View>
    );
  }
}

HomeworkTask.propTypes = {
  position: PropTypes.object,
  onChangePlanTask: PropTypes.func,
  onChangeTodoTask: PropTypes.func,
};

HomeworkTask.defaultProps = {
  position: {},
  onChangePlanTask: () => {},
  onChangeTodoTask: () => {},
};

export default HomeworkTask;
