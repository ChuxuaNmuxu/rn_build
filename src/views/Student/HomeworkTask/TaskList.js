import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import TaskItem from './TaskItem';
import styles from './taskList.scss';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatlistWidth: 0,
    };
    this.flatList = null;
  }

  componentDidMount() {
    /**
     * 必须为异步时才能起作用，FlatList默认从index为0时开始加载。
     * 当使用scrollToIndex时需要先将对应的元素加载出来,然后才能让指定元素居中
     */
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      // 将位于指定位置的元素滚动到可视区的指定位置，当viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
      this.flatList.scrollToIndex({
        animated: true,
        index: 10,
        viewOffset: 0,
        viewPosition: 0.5,
      });
    });
  }

  onLayout = (e) => {
    const {
      layout: {
        width,
      },
    } = e.nativeEvent;
    this.setState({ flatlistWidth: width });
  }

  getItemLayout = (data, index) => {
    const length = 450 + 24;
    return {
      length,
      offset: index * length,
      index,
    };
  }

  keyExtractor = item => item.toString()

  renderItem = item => <TaskItem item={item} />

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
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 34];
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

export default TaskList;
