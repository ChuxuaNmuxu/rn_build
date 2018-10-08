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
  FirstGetDropListenerRange,
  ChangeDropIndex,
} from '../../../../actions/homeworkTask';

@connect(({
  homeworkTaskReducer: {
    isFirstGetDropListenerRange,
    listenerRangeList,
    todoList,
    dragIndex,
  },
}) => ({
  isFirstGetDropListenerRange,
  listenerRangeList,
  todoList,
  dragIndex,
}), dispatch => ({
  onChangeDropPosition: bindActionCreators(ChangeDropPosition, dispatch),
  onFirstGetDropListenerRange: bindActionCreators(FirstGetDropListenerRange, dispatch),
  onChangeDropIndex: bindActionCreators(ChangeDropIndex, dispatch),
}))
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatlistWidth: 0,
      listenerRangeList: props.listenerRangeList,
      dragIndex: props.dragIndex,
    };
    this.flatList = null;
  }


  componentDidMount() {
    /**
     * 必须为异步时才能起作用，FlatList默认从index为0时开始加载。
     * 当使用scrollToIndex时需要先将对应的元素加载出来,然后才能让指定元素居中
     */
    // const wait = new Promise(resolve => setTimeout(resolve, 500));
    // wait.then(() => {
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
    // const { dragIndex: stateDragIndex, listenerRangeList: stateListenerRangeList } = prevState;
    // const { dragIndex: propsDragIndex, listenerRangeList: propsListenerRangeList } = nextProps;
    // if (propsDragIndex && stateDragIndex !== propsDragIndex) {
    //   return propsDragIndex;
    // }
    // if (propsListenerRangeList.length && !R.equals(propsListenerRangeList, stateListenerRangeList)) {
    //   return propsListenerRangeList;
    // }
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
  keyExtractor = item => item.data.toString()

  // 列表每项
  renderItem = (item) => {
    const {
      onChangeDropPosition,
      onFirstGetDropListenerRange,
      isFirstGetDropListenerRange,
      onChangeDropIndex,
    } = this.props;
    const { listenerRangeList, dragIndex } = this.state;
    console.log(102, dragIndex);
    return (
      <Task
        data={item}
        onChangeDropPosition={onChangeDropPosition}
        onFirstGetDropListenerRange={onFirstGetDropListenerRange}
        isFirstGetDropListenerRange={isFirstGetDropListenerRange}
        listenerRangeList={listenerRangeList}
        onChangeDropIndex={onChangeDropIndex}
        dragIndex={dragIndex}
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
    const { todoList } = this.props;

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
        />
      </View>
    );
  }
}

TodoList.defaultProps = {
  onChangeDropPosition: () => {},
  onFirstGetDropListenerRange: () => {},
  isFirstGetDropListenerRange: false,
  listenerRangeList: [],
  todoList: [],
  onChangeDropIndex: () => {},
  dragIndex: null,
};

TodoList.propTypes = {
  onChangeDropPosition: PropTypes.func,
  onFirstGetDropListenerRange: PropTypes.func,
  isFirstGetDropListenerRange: PropTypes.bool,
  listenerRangeList: PropTypes.array,
  todoList: PropTypes.array,
  onChangeDropIndex: PropTypes.func,
  dragIndex: PropTypes.number,
};

export default TodoList;
