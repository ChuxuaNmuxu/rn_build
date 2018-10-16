import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import R from 'ramda';
import PlanItemWrap from './PlanItemWrap';
import styles from './planList.scss';
import { currentTimeToPeriod } from '../../../../utils/common';
import {
  ChangeDropPosition,
  GetDropListenerRange,
  ChangeLastHandlePeriodIndex,
  IsgetDropListenerRange,
  ChangeDropingData,
  ChangeTodoTask,
  ChangePlanTask,
  ChangeDragingTaskCorrespondPeriod,
  SaveTask,
  IsFirstGetDropListenerRange,
} from '../../../../actions/homeworkTask';
import { adaptiveRotation } from '../../../../utils/resolution';

@connect(({
  homeworkTaskReducer: {
    listenerRangeList,
    planList,
    dragingTaskCorrespondPeriodIndex,
    lastHandlePeriodIndex,
    isRegetDropListenerRange,
    dragData,
    isFirstRegetDropListenerRange,
  },
}) => ({
  listenerRangeList,
  planList,
  dragingTaskCorrespondPeriodIndex,
  lastHandlePeriodIndex,
  isRegetDropListenerRange,
  dragData,
  isFirstRegetDropListenerRange,
}), dispatch => ({
  onChangeDropPosition: bindActionCreators(ChangeDropPosition, dispatch),
  onChangeDropingData: bindActionCreators(ChangeDropingData, dispatch),
  onChangePlanTask: bindActionCreators(ChangePlanTask, dispatch),
  onChangeTodoTask: bindActionCreators(ChangeTodoTask, dispatch),
  onChangeDragingTaskCorrespondPeriod: bindActionCreators(ChangeDragingTaskCorrespondPeriod, dispatch),
  onChangeLastHandlePeriodIndex: bindActionCreators(ChangeLastHandlePeriodIndex, dispatch),
  onIsgetDropListenerRange: bindActionCreators(IsgetDropListenerRange, dispatch),
  onGetDropListenerRange: bindActionCreators(GetDropListenerRange, dispatch),
  onSaveTask: bindActionCreators(SaveTask, dispatch),
  onIsFirstGetDropListenerRange: bindActionCreators(IsFirstGetDropListenerRange, dispatch),
}))
class PlanList extends Component {
  constructor(props) {
    super(props);
    this.flatList = null;
    this.currentPeriodIndex = currentTimeToPeriod();
    this.timeItemRefList = []; // timeItem ref
    this.state = {
      flatlistWidth: 0,
      dragingTaskCorrespondPeriodIndex: props.dragingTaskCorrespondPeriodIndex,
      listenerRangeList: props.listenerRangeList,
      lastHandlePeriodIndex: props.lastHandlePeriodIndex,
    };
  }

  componentDidMount() {
    const { onChangeLastHandlePeriodIndex } = this.props;
    onChangeLastHandlePeriodIndex(this.currentPeriodIndex);
  }

  componentDidUpdate() {
    const {
      isRegetDropListenerRange,
      onIsgetDropListenerRange,
      isFirstRegetDropListenerRange,
    } = this.props;
    if (isRegetDropListenerRange) {
      this.saveListenerRangeToStore()
        .then(() => onIsgetDropListenerRange(false));
    }
    if (isFirstRegetDropListenerRange) {
      const { onIsFirstGetDropListenerRange } = this.props;
      onIsFirstGetDropListenerRange(false);
      this.scrollToIndex();
    }
  }

  // 滑动时间段动画结束之后的回调
  onMomentumScrollEnd = () => {
    this.saveListenerRangeToStore();
  }

  // 通过 onLayout 获取 最外面容器宽，当 FlatList 为空时，给 renderListEmpty 里面里的容器设置值让其可以全屏
  onLayout = (e) => {
    const {
      layout: {
        width,
      },
    } = e.nativeEvent;
    this.setState({ flatlistWidth: width });
  }

  // 批量获取每个时间段的offset值
  getTimeItemOffsetList = () => {
    const timeItemOffsetList = this.timeItemRefList.map(this.getTimeItemOffset);
    return Promise.all(timeItemOffsetList);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      dragingTaskCorrespondPeriodIndex: stateDragingTaskCorrespondPeriodIndex,
      listenerRangeList: stateListenerRangeList,
      lastHandlePeriodIndex: stateLastHandlePeriodIndex,
    } = prevState;
    const {
      dragingTaskCorrespondPeriodIndex: propsDragingTaskCorrespondPeriodIndex,
      listenerRangeList: propsListenerRangeList,
      lastHandlePeriodIndex: propsLastHandlePeriodIndex,
    } = nextProps;
    if (stateDragingTaskCorrespondPeriodIndex !== propsDragingTaskCorrespondPeriodIndex) {
      return {
        dragingTaskCorrespondPeriodIndex: propsDragingTaskCorrespondPeriodIndex,
      };
    }
    if (stateListenerRangeList !== propsListenerRangeList) {
      return {
        listenerRangeList: propsListenerRangeList,
      };
    }
    if (stateLastHandlePeriodIndex !== propsLastHandlePeriodIndex) {
      return {
        lastHandlePeriodIndex: propsLastHandlePeriodIndex,
      };
    }

    return null;
  }

  // 获取单个时间段的offset值
  getTimeItemOffset = (v, k) => {
    const { scale } = adaptiveRotation();
    return new Promise(((resolve) => {
      v.measure((x, y, width, height, pageX, pageY) => {
        // 通过measure或者的width、height是适配之前的值所有需要乘以缩放比，pageX、pageY是之后的值
        const obj = {
          startX: pageX,
          endX: pageX + width * scale,
          startY: pageY,
          endY: pageY + height * scale,
          index: k,
          width,
        };
        resolve(obj);
      });
    }));
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

  scrollToIndex = () => {
    /**
     * 必须为异步时才能起作用，FlatList默认从index为0时开始加载。
     * 当使用scrollToIndex时需要先将对应的元素加载出来,然后才能让指定元素居中
     */
    const delay = new Promise(resolve => setTimeout(resolve, 500));
    delay.then(() => {
      // 将位于指定位置的元素滚动到可视区的指定位置，当viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
      // 如果有展开并且展开的任务
      this.flatList.scrollToIndex({
        animated: false,
        index: this.currentPeriodIndex,
        viewOffset: (142 - 496) / 2,
        viewPosition: 0.5,
      });
      this.saveListenerRangeToStore();
    });
  }

  // 将获取的时间段范围保存在store中
  saveListenerRangeToStore = () => {
    const { onGetDropListenerRange } = this.props;
    return this.getTimeItemOffsetList()
      .then((data) => {
        const filterData = data.filter(v => v.startX >= -v.width);
        onGetDropListenerRange(filterData);
      });
  }

  keyExtractor = data => data.period

  renderItem = (data) => {
    const {
      onChangeDropPosition,
      listenerRangeList,
      dragingTaskCorrespondPeriodIndex,
      lastHandlePeriodIndex,
      onIsgetDropListenerRange,
      onChangeDropingData,
      onChangeTodoTask,
      onChangePlanTask,
      onChangeDragingTaskCorrespondPeriod,
      planList,
      onChangeLastHandlePeriodIndex,
      onSaveTask,
      dragData,
    } = this.props;

    return (
      <PlanItemWrap
        data={data}
        planList={planList}
        onChangeDropPosition={onChangeDropPosition}
        listenerRangeList={listenerRangeList}
        getTimeItemRef={this.getTimeItemRef}
        dragingTaskCorrespondPeriodIndex={dragingTaskCorrespondPeriodIndex}
        lastHandlePeriodIndex={lastHandlePeriodIndex}
        onIsgetDropListenerRange={onIsgetDropListenerRange}
        onChangeDropingData={onChangeDropingData}
        onChangeTodoTask={onChangeTodoTask}
        onChangePlanTask={onChangePlanTask}
        onChangeDragingTaskCorrespondPeriod={onChangeDragingTaskCorrespondPeriod}
        onChangeLastHandlePeriodIndex={onChangeLastHandlePeriodIndex}
        onSaveTask={onSaveTask}
        focus={data.index === dragingTaskCorrespondPeriodIndex}
        dragData={dragData}
      />
    );
  }


  renderListEmpty = () => {
    const {
      flatlistWidth,
    } = this.state;
    return (
      <View style={[styles.empty, { width: flatlistWidth }]}>
        <Text style={styles.empty_text}>暂无数据</Text>
      </View>
    );
  }

  render() {
    const { planList, dragData } = this.props;

    return (
      <View
        style={styles.time_list_box}
        onLayout={this.onLayout}
      >
        <FlatList
          horizontal
          ref={(ref) => { this.flatList = ref; }}
          data={planList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          getItemLayout={this.getItemLayout}
          initialNumToRender={planList.length}
          ListEmptyComponent={this.renderListEmpty}
          extraData={this.state}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          scrollEnabled={R.isEmpty(dragData)}
        />
      </View>
    );
  }
}

PlanList.propTypes = {
  onChangeDropPosition: PropTypes.func,
  onGetDropListenerRange: PropTypes.func,
  planList: PropTypes.array,
  listenerRangeList: PropTypes.array,
  dragingTaskCorrespondPeriodIndex: PropTypes.number,
  lastHandlePeriodIndex: PropTypes.number,
  onChangeLastHandlePeriodIndex: PropTypes.func,
  onIsgetDropListenerRange: PropTypes.func,
  isRegetDropListenerRange: PropTypes.bool,
  isFirstRegetDropListenerRange: PropTypes.bool,
  onChangeDropingData: PropTypes.func,
  onChangePlanTask: PropTypes.func,
  onChangeTodoTask: PropTypes.func,
  onChangeDragingTaskCorrespondPeriod: PropTypes.func,
  dragData: PropTypes.object,
  onSaveTask: PropTypes.func,
  onIsFirstGetDropListenerRange: PropTypes.func,
};

PlanList.defaultProps = {
  onChangeDropPosition: () => {},
  onGetDropListenerRange: () => {},
  listenerRangeList: [],
  planList: [],
  dragingTaskCorrespondPeriodIndex: null,
  lastHandlePeriodIndex: null,
  onChangeLastHandlePeriodIndex: () => {},
  onIsgetDropListenerRange: () => {},
  isRegetDropListenerRange: false,
  isFirstRegetDropListenerRange: false,
  onChangeDropingData: () => {},
  onChangePlanTask: () => {},
  onChangeTodoTask: () => {},
  onChangeDragingTaskCorrespondPeriod: () => {},
  dragData: {},
  onSaveTask: () => {},
  onIsFirstGetDropListenerRange: () => {},
};

export default PlanList;
