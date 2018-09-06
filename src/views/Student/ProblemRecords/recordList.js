import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { PullView } from 'react-native-pull';
import RecordCard from './Components/recordCard';
import styles from './recordList.scss';

class RecordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadText: '',
    };
  }

  onPullOk = () => {
    // 只要拉倒那个临界点，就会调用该方法
    this.setState({
      loadText: '释放刷新',
    });
  }

  onPulling = () => {
    // 下拉时调用
    this.setState({
      loadText: '下拉刷新',
    });
  }

  onPullRelease = (resolve) => {
    // 松开手指刷新调用
    this.setState({
      loadText: '正在刷新',
    });
    setTimeout(() => {
      // 请求数据
      this.setState({
        loadText: '下拉刷新',
      });
      // 回到原始状态
      resolve();
    }, 2000);
  }

  topIndicatorRender = (pulling, pullok, pullrelease) => {
    const { loadText } = this.state;
    return (
      <View style={{
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60,
      }}
      >
        <ActivityIndicator size="large" color="#30bf6c" />
        <Text style={styles.loadTextStyle}>{loadText}</Text>
      </View>
    );
  }

  render() {
    const { dataList } = this.props;
    return (
      <PullView
        style={styles.recordList}
        onPullRelease={this.onPullRelease}
        onPullOk={this.onPullOk}
        onPulling={this.onPulling}
        topIndicatorRender={this.topIndicatorRender}
      >
        {
          dataList.map(item => (
            <RecordCard key={item.id} datas={item} />
          ))
        }
      </PullView>
    );
  }
}

RecordList.propTypes = {
  dataList: PropTypes.array.isRequired,
};

export default RecordList;
