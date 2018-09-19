import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import I18nText from '../../../../components/I18nText';
import { handleFormattingTime } from '../../../../utils/common/common';
import styles from './Timer.scss';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
    };
    this.timeSetInterval = null;
  }

  componentDidMount() {
    this.timeSetInterval = setInterval(() => {
      const { currentTime } = this.state;
      this.setState({
        currentTime: currentTime + 1,
      });
    }, 1000);
  }

  componentWillUnmount() { // 离开页面时清除计时器
    global.clearInterval(this.timeSetInterval);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.startTime !== prevState.startTime) {
      return {
        currentTime: nextProps.startTime,
      };
    }
    return null;
  }


  getTimer = () => { // 供父组件调用 返回当前计时
    const { currentTime } = this.state;
    return currentTime;
  }

  render() {
    const { currentTime } = this.state;
    return (
      <Text style={styles.doHomeworkTime}>
        <I18nText>
          DoHomeworks.header.count
        </I18nText>
        { handleFormattingTime(currentTime) }
      </Text>
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
};

export default Timer;
