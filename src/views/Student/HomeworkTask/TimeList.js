import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeItem from './TimeItem';
import styles from './timeList.scss';
import { createHalfHourPeriod, currentTimeToPeriod } from '../../../utils/common';
import { ChangeDropPosition, IsGetDropListenerRange, GetDropListenerRange } from '../../../actions/homeworkTask';

@connect(({
  homeworkTaskReducer: {
    isGetDropListenerRange,
  },
}) => ({
  isGetDropListenerRange,
}), dispatch => ({
  onChangeDropPosition: bindActionCreators(ChangeDropPosition, dispatch),
  onIsGetDropListenerRange: bindActionCreators(IsGetDropListenerRange, dispatch),
  onGetDropListenerRange: bindActionCreators(GetDropListenerRange, dispatch),
}))
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.flatList = null;
    this.periods = createHalfHourPeriod(); // 生成半小时时间段数组
    this.currentPeriodIndex = currentTimeToPeriod();
    this.state = {
    };
  }

  componentDidMount() {
    /**
     * 必须为异步时才能起作用，FlatList默认从index为0时开始加载。
     * 当使用scrollToIndex时需要先将对应的元素加载出来,然后才能让指定元素居中
     */
    // const wait = new Promise(resolve => setTimeout(resolve, 500));
    // wait.then(() => {
    //   // 将位于指定位置的元素滚动到可视区的指定位置，当viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
    //   // 如果有展开并且展开的任务
    //   this.flatList.scrollToIndex({
    //     animated: true,
    //     index: this.currentPeriodIndex,
    //     viewOffset: (142 - 496) / 2,
    //     viewPosition: 0.5,
    //   });
    // });
  }

  onMomentumScrollEnd = () => {
    const { onIsGetDropListenerRange } = this.props;
    onIsGetDropListenerRange(true);
  }

  getItemLayout = (data, index) => {
    const length = 142;
    return {
      length,
      offset: index * length,
      index,
    };
  }

  keyExtractor = item => item.data.toString()

  renderItem = (data) => {
    const {
      onChangeDropPosition,
      isGetDropListenerRange,
      onGetDropListenerRange,
    } = this.props;
    return (
      <TimeItem
        data={data}
        onChangeDropPosition={onChangeDropPosition}
        isGetDropListenerRange={isGetDropListenerRange}
        onGetDropListenerRange={onGetDropListenerRange}
      />
    );
  }

  render() {
    const data = this.periods.map(v => ({
      data: v,
      currentPeriod: this.periods[this.currentPeriodIndex],
    }));
    return (
      <View style={styles.time_list_box}>
        <FlatList
          horizontal
          ref={(ref) => { this.flatList = ref; }}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          getItemLayout={this.getItemLayout}
          initialNumToRender={this.periods.length}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
        />
      </View>
    );
  }
}

TaskList.propTypes = {
  onChangeDropPosition: PropTypes.func,
  isGetDropListenerRange: PropTypes.bool,
  onIsGetDropListenerRange: PropTypes.func,
  onGetDropListenerRange: PropTypes.func,
};

TaskList.defaultProps = {
  onChangeDropPosition: () => {},
  isGetDropListenerRange: false,
  onIsGetDropListenerRange: () => {},
  onGetDropListenerRange: () => {},
};

export default TaskList;
