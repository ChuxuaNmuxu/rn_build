import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeItem from './TimeItem';
import styles from './timeList.scss';
import { createHalfHourPeriod, currentTimeToPeriod } from '../../../utils/common';
import { ChangeDropPosition, FirstGetDropListenerRange, GetDropListenerRange } from '../../../actions/homeworkTask';
import { adaptiveRotation } from '../../../utils/resolution';

@connect(({
  homeworkTaskReducer: {
    isFirstGetDropListenerRange,
  },
}) => ({
  isFirstGetDropListenerRange,
}), dispatch => ({
  onChangeDropPosition: bindActionCreators(ChangeDropPosition, dispatch),
  onFirstGetDropListenerRange: bindActionCreators(FirstGetDropListenerRange, dispatch),
  onGetDropListenerRange: bindActionCreators(GetDropListenerRange, dispatch),
}))
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.flatList = null;
    this.periods = createHalfHourPeriod(); // 生成半小时时间段数组
    this.currentPeriodIndex = currentTimeToPeriod();
    this.timeItemRefList = []; // timeItem ref
  }

  componentDidMount() {
    /**
     * 必须为异步时才能起作用，FlatList默认从index为0时开始加载。
     * 当使用scrollToIndex时需要先将对应的元素加载出来,然后才能让指定元素居中
     */
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      // 将位于指定位置的元素滚动到可视区的指定位置，当viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
      // 如果有展开并且展开的任务
      this.flatList.scrollToIndex({
        animated: true,
        index: this.currentPeriodIndex,
        viewOffset: (142 - 496) / 2,
        viewPosition: 0.5,
      });
    });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.isFirstGetDropListenerRange) {
      this.saveListenerRangeToStore();
    }
  }

  // 滑动时间段动画结束之后的回调
  onMomentumScrollEnd = () => {
    const {
      isFirstGetDropListenerRange,
      onFirstGetDropListenerRange,
    } = this.props;
    if (isFirstGetDropListenerRange) onFirstGetDropListenerRange(false);
    this.saveListenerRangeToStore();
  }

  // 批量获取每个时间段的offset值
  getTimeItemOffsetList = () => {
    const { scale } = adaptiveRotation();
    const timeItemOffsetList = this.timeItemRefList.map((v, k) => new Promise(((resolve) => {
      v.measure((x, y, width, height, pageX, pageY) => {
        // 通过measure或者的width、height是适配之前的值所有需要乘以缩放比，pageX、pageY是之后的值
        const obj = {
          startX: pageX,
          endX: pageX + width * scale,
          startY: pageY,
          endY: pageY + height * scale,
          index: k,
        };
        resolve(obj);
      });
    })));

    return Promise.all(timeItemOffsetList);
  }

  getItemLayout = (data, index) => {
    const length = 142;
    return {
      length,
      offset: index * length,
      index,
    };
  }

  getTimeItemRef = (ref) => {
    this.timeItemRefList.push(ref);
  }

  // 将获取的时间段范围保存在store中
  saveListenerRangeToStore = () => {
    const { onGetDropListenerRange } = this.props;
    this.getTimeItemOffsetList()
      .then(data => onGetDropListenerRange(data));
  }

  keyExtractor = item => item.data.toString()

  renderItem = (data) => {
    const {
      onChangeDropPosition,
      isFirstGetDropListenerRange,
      onFirstGetDropListenerRange,
    } = this.props;
    return (
      <TimeItem
        data={data}
        onChangeDropPosition={onChangeDropPosition}
        isFirstGetDropListenerRange={isFirstGetDropListenerRange}
        onFirstGetDropListenerRange={onFirstGetDropListenerRange}
        getTimeItemRef={this.getTimeItemRef}
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
  isFirstGetDropListenerRange: PropTypes.bool,
  onFirstGetDropListenerRange: PropTypes.func,
  onGetDropListenerRange: PropTypes.func,
};

TaskList.defaultProps = {
  onChangeDropPosition: () => {},
  isFirstGetDropListenerRange: false,
  onFirstGetDropListenerRange: () => {},
  onGetDropListenerRange: () => {},
};

export default TaskList;
