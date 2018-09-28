import React, { PureComponent } from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { merge } from 'ramda';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import styles from './taskList.scss';
import { ChangeDropPosition, IsGetDropListenerRange } from '../../../actions/homeworkTask';

@connect(({
  homeworkTaskReducer: {
    isGetDropListenerRange,
  },
}) => ({
  isGetDropListenerRange,
}), dispatch => ({
  onChangeDropPosition: bindActionCreators(ChangeDropPosition, dispatch),
  onIsGetDropListenerRange: bindActionCreators(IsGetDropListenerRange, dispatch),
}))
class TaskList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flatlistWidth: 0,
      // scrollEnabled: true,
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

  // 单击
  onPress = (e) => {
    console.log('单击');
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
      onIsGetDropListenerRange,
      isGetDropListenerRange,
    } = this.props;
    return (
      <TaskItem
        data={item}
        onPress={this.onPress}
        onChangeDropPosition={onChangeDropPosition}
        onIsGetDropListenerRange={onIsGetDropListenerRange}
        isGetDropListenerRange={isGetDropListenerRange}
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
    const data = Array(20).fill({}).map((v, i) => (merge(v, {
      data: i,
    })));

    return (
      <View
        style={styles.task_list_box}
        onLayout={this.onLayout}
      >
        <FlatList
          horizontal
          ref={(ref) => { this.flatList = ref; }}
          data={data}
          style={styles.latList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          getItemLayout={this.getItemLayout}
          // initialScrollIndex={10}
          // initialNumToRender={parseInt(data.length / 2) + 4}
          ListEmptyComponent={this.renderListEmpty}
        />
      </View>
    );
  }
}

TaskList.defaultProps = {
  onChangeDropPosition: () => {},
  onIsGetDropListenerRange: () => {},
  isGetDropListenerRange: false,
};

TaskList.propTypes = {
  onChangeDropPosition: PropTypes.func,
  onIsGetDropListenerRange: PropTypes.func,
  isGetDropListenerRange: PropTypes.bool,
};

export default TaskList;
