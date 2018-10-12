import React, { Component } from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';
import Task from '../component/Task';
import styles from './todoList.scss';
import {
  ChangeDropPosition,
  ChangeDropingData,
  ChangeTodoTask,
  ChangePlanTask,
  ChangeDragingTaskCorrespondPeriod,
  ChangeLastHandlePeriodIndex,
  RegetDropListenerRange,
  SaveTask,

} from '../../../../actions/homeworkTask';

@connect(({
  homeworkTaskReducer: {
    listenerRangeList,
    todoList,
    dragData,
    planList,
    lastHandlePeriodIndex,
  },
}) => ({
  listenerRangeList,
  todoList,
  dragData,
  planList,
  lastHandlePeriodIndex,
}), dispatch => ({
  onChangeDropPosition: bindActionCreators(ChangeDropPosition, dispatch),
  onChangeDropingData: bindActionCreators(ChangeDropingData, dispatch),
  onChangePlanTask: bindActionCreators(ChangePlanTask, dispatch),
  onChangeTodoTask: bindActionCreators(ChangeTodoTask, dispatch),
  onChangeDragingTaskCorrespondPeriod: bindActionCreators(ChangeDragingTaskCorrespondPeriod, dispatch),
  onChangeLastHandlePeriodIndex: bindActionCreators(ChangeLastHandlePeriodIndex, dispatch),
  onRegetDropListenerRange: bindActionCreators(RegetDropListenerRange, dispatch),
  onSaveTask: bindActionCreators(SaveTask, dispatch),
}))
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatlistWidth: 0,
      listenerRangeList: props.listenerRangeList,
      dragData: props.dragData,
    };
    this.flatList = null;
  }

  componentDidMount() {
    /**
     * 必须为异步时才能起作用，FlatList默认从index为0时开始加载。
     * 当使用scrollToIndex时需要先将对应的元素加载出来,然后才能让指定元素居中
     */
    // const delay = new Promise(resolve => setTimeout(resolve, 500));
    // delay.then(() => {
    //   // 将位于指定位置的元素滚动到可视区的指定位置，当viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
    //   this.flatList.scrollToIndex({
    //     animated: true,
    //     index: 10,
    //     viewOffset: 0,
    //     viewPosition: 0.5,
    //   });
    // });
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      dragData: stateDragData,
      listenerRangeList: stateListenerRangeList,
      planList: statePlanList,
      lastHandlePeriodIndex: stateLastHandlePeriodIndex,
    } = prevState;
    const {
      dragData: propsDragData,
      listenerRangeList: propsListenerRangeList,
      planList: propsPlanList,
      lastHandlePeriodIndex: propsLastHandlePeriodIndex,
    } = nextProps;

    if (stateDragData !== propsDragData) {
      return { dragData: propsDragData };
    }
    if (propsListenerRangeList.length && !R.equals(propsListenerRangeList, stateListenerRangeList)) {
      return { listenerRangeList: propsListenerRangeList };
    }
    if (propsPlanList.length && !R.equals(propsPlanList, statePlanList)) {
      return { planList: propsPlanList };
    }
    if (stateLastHandlePeriodIndex !== propsLastHandlePeriodIndex) {
      return {
        lastHandlePeriodIndex: propsLastHandlePeriodIndex,
      };
    }

    return null;
  }

  getItemLayout = (data, index) => {
    const length = 450 + 24;
    return {
      length,
      offset: index * length,
      index,
    };
  }

  // key
  keyExtractor = item => item.homeworkId

  // 列表每项
  renderItem = (data) => {
    const {
      onChangeDropPosition,
      onChangeDropingData,
      onChangeTodoTask,
      onChangePlanTask,
      onChangeDragingTaskCorrespondPeriod,
      onChangeLastHandlePeriodIndex,
      planList,
      lastHandlePeriodIndex,
      onRegetDropListenerRange,
      onSaveTask,
    } = this.props;
    const { listenerRangeList, dragData } = this.state;
    return (
      <Task
        data={data.item}
        onChangeDropPosition={onChangeDropPosition}
        listenerRangeList={listenerRangeList}
        onChangeDropingData={onChangeDropingData}
        dragData={dragData}
        onChangeTodoTask={onChangeTodoTask}
        onChangePlanTask={onChangePlanTask}
        onChangeDragingTaskCorrespondPeriod={onChangeDragingTaskCorrespondPeriod}
        onChangeLastHandlePeriodIndex={onChangeLastHandlePeriodIndex}
        lastHandlePeriodIndex={lastHandlePeriodIndex}
        planList={planList}
        onRegetDropListenerRange={onRegetDropListenerRange}
        onSaveTask={onSaveTask}
      />
    );
  }

  renderListEmpty = () => {
    const {
      flatlistWidth,
    } = this.state;
    // 暂无作业任务
    return (
      <View style={[styles.empty, { width: flatlistWidth }]}>
        <Text style={styles.empty_text}>所有任务已经安排完毕，快去完成它们吧……</Text>
      </View>
    );
  }


  render() {
    const { todoList, dragData } = this.props;

    return (
      <View
        style={styles.task_list_box}
        onLayout={this.onLayout}
      >
        <FlatList
          horizontal
          ref={(ref) => { this.flatList = ref; }}
          data={todoList}
          style={styles.latList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          getItemLayout={this.getItemLayout}
          // initialNumToRender={planList.length}
          ListEmptyComponent={this.renderListEmpty}
          extraData={this.state}
          scrollEnabled={R.isEmpty(dragData)}
        />
      </View>
    );
  }
}

TodoList.defaultProps = {
  onChangeDropPosition: () => {},
  listenerRangeList: [],
  todoList: [],
  onChangeDropingData: () => {},
  dragData: {},
  onChangePlanTask: () => {},
  onChangeTodoTask: () => {},
  onChangeDragingTaskCorrespondPeriod: () => {},
  onChangeLastHandlePeriodIndex: () => {},
  planList: [],
  lastHandlePeriodIndex: null,
  onRegetDropListenerRange: () => {},
  onSaveTask: () => {},
};

TodoList.propTypes = {
  onChangeDropPosition: PropTypes.func,
  listenerRangeList: PropTypes.array,
  todoList: PropTypes.array,
  onChangeDropingData: PropTypes.func,
  dragData: PropTypes.object,
  onChangePlanTask: PropTypes.func,
  onChangeTodoTask: PropTypes.func,
  onChangeDragingTaskCorrespondPeriod: PropTypes.func,
  onChangeLastHandlePeriodIndex: PropTypes.func,
  planList: PropTypes.array,
  lastHandlePeriodIndex: PropTypes.number,
  onRegetDropListenerRange: PropTypes.func,
  onSaveTask: PropTypes.func,
};

export default TodoList;
