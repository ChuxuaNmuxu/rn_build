import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import TimeItem from './TimeItem';
import styles from './timeList.scss';
import { createHalfHourPeriod, currentTimeToPeriod } from '../../../utils/common';

class TaskList extends PureComponent {
  constructor(props) {
    super(props);
    this.flatList = null;
    this.periods = createHalfHourPeriod(); // 生成半小时时间段数组
    this.currentPeriodIndex = currentTimeToPeriod();
    this.state = {
      scrollEnabled: true,
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


  getItemLayout = (data, index) => {
    const length = 142;
    return {
      length,
      offset: index * length,
      index,
    };
  }

  changeScrollEnabled = (bool) => {
    console.log(47, bool);
    // this.setState({
    //   scrollEnabled: bool,
    // });
  }

  keyExtractor = item => item.data.toString()

  renderItem = data => <TimeItem data={data} />

  render() {
    const { scrollEnabled } = this.state;
    const data = this.periods.map(v => ({
      data: v,
      changeScrollEnabled: this.changeScrollEnabled,
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
          scrollEnabled={scrollEnabled}
        />
      </View>
    );
  }
}

export default TaskList;
