import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style.scss';
import RefreshState from './RefreshState';

class RefreshHeader extends Component {
  static propTypes = {
    status: PropTypes.string,
    headerRefreshingText: PropTypes.string,
    headerSuccessText: PropTypes.string,
    headerFailureText: PropTypes.string,
    onRefreshAgain: PropTypes.func, // 重新刷新
  };

  static defaultProps = {
    headerRefreshingText: '正在刷新',
    headerSuccessText: '刷新成功',
    headerFailureText: '刷新失败，点击重试',
  };

  render() {
    const {
      status,
      headerRefreshingText,
      headerSuccessText,
      headerFailureText,
      onRefreshAgain,
    } = this.props;
    let header = null;
    switch (status) {
      case RefreshState.Idle:
        // Idle情况下为null，不显示头部组件
        break;
      case RefreshState.Refreshing:
        // 显示一个loading视图，正在刷新
        header = (
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#30BF6C" />
            <Text style={styles.refreshingText}>{headerRefreshingText}</Text>
          </View>
        );
        break;
      case RefreshState.RefreshSuccess:
        // 刷新成功
        header = (
          <View style={styles.loadingView}>
            <Text style={styles.headerText}>{headerSuccessText}</Text>
          </View>
        );
        break;
      case RefreshState.Failure:
        // 刷新失败的情况使用TouchableOpacity做一个可点击的组件，外部调用onRefreshAgain重新刷新数据
        header = (
          <TouchableOpacity
            style={styles.loadingView}
            onPress={() => {
              if (onRefreshAgain) {
                onRefreshAgain();
              }
            }}
          >
            <Text style={styles.headerText}>{headerFailureText}</Text>
          </TouchableOpacity>
        );
        break;
      default:
        header = null;
    }
    return header;
  }
}

export default RefreshHeader;
