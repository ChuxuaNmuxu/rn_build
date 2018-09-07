import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style.scss';
import RefreshState from './RefreshState';

class RefreshFooter extends Component {
  static propTypes = {
    status: PropTypes.string,
    footerRefreshingText: PropTypes.string,
    footerLoadMoreText: PropTypes.string,
    footerNoMoreDataText: PropTypes.string,
    footerFailureText: PropTypes.string,
    onLoadMore: PropTypes.func, // 加载更多数据的方法
    onRetryLoading: PropTypes.func, // 重新加载的方法
  };

  static defaultProps = {
    footerRefreshingText: '努力加载中',
    footerLoadMoreText: '上拉加载更多',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已全部加载完毕',
  };

  render() {
    const {
      status,
      footerRefreshingText,
      footerLoadMoreText,
      footerNoMoreDataText,
      footerFailureText,
      onRetryLoading,
    } = this.props;
    let footer = null;
    switch (status) {
      case RefreshState.Idle:
        // Idle情况下为null，不显示尾部组件
        break;
      case RefreshState.Refreshing:
        // 显示一个loading视图
        footer = (
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#30BF6C" />
            <Text style={styles.refreshingText}>{footerRefreshingText}</Text>
          </View>
        );
        break;
      case RefreshState.CanLoadMore:
        // 显示上拉加载更多的文字
        footer = (
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{footerLoadMoreText}</Text>
          </View>
        );
        break;
      case RefreshState.NoMoreData:
        // 显示没有更多数据的文字，内容可以自己修改
        footer = (
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
          </View>
        );
        break;
      case RefreshState.Failure:
        // 加载失败的情况使用TouchableOpacity做一个可点击的组件，外部调用onRetryLoading重新加载数据
        footer = (
          <TouchableOpacity
            style={styles.loadingView}
            onPress={() => {
              if (onRetryLoading) {
                onRetryLoading();
              }
            }}
          >
            <Text style={styles.footerText}>{footerFailureText}</Text>
          </TouchableOpacity>
        );
        break;
      default:
        footer = null;
    }
    return footer;
  }
}

export default RefreshFooter;
