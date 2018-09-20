import React, { PureComponent } from 'react';
import {
  View, Text, FlatList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { merge } from 'ramda';
import PropTypes from 'prop-types';
import TouchTaskItem from './TouchTaskItem';
import styles from './taskList.scss';
import { ChangeDropLocation } from '../../../actions/homeworkTask';

@connect(null, dispatch => ({
  onChangeDropLocation: bindActionCreators(ChangeDropLocation, dispatch),
}))
class TaskList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flatlistWidth: 0,
      scrollEnabled: true,
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

  // 长按禁止FlatList滚动，并用
  onLongPress = (e, data) => {
    const { onChangeDropLocation } = this.props;
    this.changeScrollEnabled(false);
    onChangeDropLocation({
      x: data.offsetX,
      y: data.offsetY,
    });
  }

  // 鼠标放开之后恢复FlatList滚动
  onPressOut = (e) => {
    // console.log('鼠标放开了');
    this.changeScrollEnabled(true);
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

  // 更改滑动状态
  changeScrollEnabled = (bool) => {
    this.setState({
      scrollEnabled: bool,
    });
  }

  // 列表每项
  renderItem = item => (
    <TouchTaskItem
      item={item}
      onLongPress={this.onLongPress}
      onPressOut={this.onPressOut}
      onPress={this.onPress}
    />
  )

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
    const { scrollEnabled } = this.state;
    const data = Array(20).fill({}).map((v, i) => (merge(v, {
      data: i,
      scrollEnabled,
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
          scrollEnabled={scrollEnabled}
        />
      </View>
    );
  }
}

TaskList.defaultProps = {
  onChangeDropLocation: () => {},
};

TaskList.propTypes = {
  onChangeDropLocation: PropTypes.func,
};

export default TaskList;
