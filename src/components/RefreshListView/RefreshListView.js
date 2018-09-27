import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import RefreshState from './RefreshState';
import RefreshHeader from './RefreshHeader';
import RefreshFooter from './RefreshFooter';

class RefreshListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowRefreshIcon: false, // 头部下拉刷新是否显示RefreshControl自带的刷新指示器
      isHeaderRefreshing: false, // 头部是否正在刷新
      isFooterRefreshing: false, // 尾部是否正在刷新
      headerState: RefreshState.Idle, // 头部当前的状态，默认为Idle，不显示控件
      footerState: RefreshState.Idle, // 尾部当前的状态，默认为Idle，不显示控件
    };
  }


  // 头部组件的状态，供外部调用，一般不会用到
  setheaderState = (headerState) => {
    // const {  } = this.props;
    this.setState({
      headerState,
    });
  }

  // 尾部组件的状态，供外部调用，一般不会用到
  setfooterState = (footerState) => {
    // const {  } = this.props;
    this.setState({
      footerState,
    });
  }

  _renderHeader = headerState => (
    <RefreshHeader
      status={headerState}
      onRefreshAgain={() => {
        this.beginHeaderRefresh();
      }}
    />
  );


  _renderFooter = footerState => (
    <RefreshFooter
      status={footerState}
      onRetryLoading={() => {
        this.beginFooterRefresh();
      }}
    />
  );

  // 开始下拉刷新
  beginHeaderRefresh = () => {
    if (this.shouldStartHeaderRefreshing()) {
      this.startHeaderRefreshing();
    }
  }

  // 开始上拉加载更多
  beginFooterRefresh = () => {
    if (this.shouldStartFooterRefreshing()) {
      this.startFooterRefreshing();
    }
  }

  // 下拉刷新，设置完刷新状态后再调用刷新方法，使页面上可以显示出加载中的UI，注意这里setState写法
  startHeaderRefreshing = () => {
    const { onHeaderRefresh } = this.props;
    this.setState({
      headerState: RefreshState.Refreshing,
      isHeaderRefreshing: true,
    }, () => {
      if (onHeaderRefresh) {
        onHeaderRefresh();
      }
    });
  }

  // 上拉加载更多，将底部刷新状态改为正在刷新，然后调用刷新方法，页面上可以显示出加载中的UI，注意这里setState写法
  startFooterRefreshing = () => {
    const { onFooterRefresh } = this.props;
    this.setState({
      footerState: RefreshState.Refreshing,
      isFooterRefreshing: true,
    }, () => {
      if (onFooterRefresh) {
        onFooterRefresh();
      }
    });
  }

  /** *
   * 当前是否可以进行下拉刷新
   * @returns {boolean}
   *
   * 如果列表尾部正在执行上拉加载，就返回false
   * 如果列表头部已经在刷新中了，就返回false
   */
  shouldStartHeaderRefreshing = () => {
    const { footerState, isHeaderRefreshing, isFooterRefreshing } = this.state;
    if (footerState === RefreshState.refreshing || isHeaderRefreshing || isFooterRefreshing) {
      return false;
    }
    return true;
  }

  /** *
   * 当前是否可以进行上拉加载更多
   * @returns {boolean}
   *
   * 如果底部已经在刷新，返回false
   * 如果底部状态是没有更多数据了，返回false
   * 如果头部在刷新，则返回false
   * 如果列表数据为空，则返回false（初始状态下列表是空的，这时候肯定不需要上拉加载更多，而应该执行下拉刷新）
   */
  shouldStartFooterRefreshing = () => {
    const { footerState, isHeaderRefreshing, isFooterRefreshing } = this.state;
    const { data } = this.props;
    if (footerState === RefreshState.refreshing
      || footerState === RefreshState.NoMoreData
      || data.length === 0
      || isHeaderRefreshing
      || isFooterRefreshing) {
      return false;
    }
    return true;
  }

  /**
   * 根据头部组件状态来停止刷新
   * @param hraderState
   * 刷新成功或者刷新失败
   */
  endHeaderRefreshing = (headerState) => {
    const headerRefreshState = headerState || headerState.Idle;
    this.setState({
      headerState: headerRefreshState,
      isHeaderRefreshing: false,
      isFooterRefreshing: false,
    });
  }

  /**
   * 根据尾部组件状态来停止刷新
   * @param footerState
   *
   * 如果刷新完成，当前列表数据源是空的，就不显示尾部组件了。
   * 这里这样做是因为通常列表无数据时，我们会显示一个空白页，如果再显示尾部组件如"没有更多数据了"就显得很多余
   */
  endRefreshing = (footerState) => {
    let footerRefreshState = footerState;
    const { data } = this.props;
    if (data.length === 0) {
      footerRefreshState = RefreshState.Idle;
    }
    this.setState({
      footerState: footerRefreshState,
      isHeaderRefreshing: false,
      isFooterRefreshing: false,
    });
  }

  render() {
    const { isShowRefreshIcon, footerState, headerState } = this.state;
    return (
      <FlatList
      // 传进所有参数
        {...this.props}
        refreshControl={(
          <RefreshControl
            colors={['#30BF6C']}
            progressBackgroundColor="#fff"
            refreshing={isShowRefreshIcon}
            onRefresh={() => { this.beginHeaderRefresh(); }}
          />
        )}
        ListHeaderComponent={() => this._renderHeader(headerState)}
        onEndReached={() => { this.beginFooterRefresh(); }}
        onEndReachedThreshold={0.1} // 这里取值0.1，可以根据实际情况调整，取值尽量小,取值范围时0-1
        ListFooterComponent={() => this._renderFooter(footerState)}
      />
    );
  }
}

RefreshListView.propTypes = {
  onHeaderRefresh: PropTypes.func, // 下拉刷新的方法
  onFooterRefresh: PropTypes.func, // 上拉加载的方法
  data: PropTypes.array, // 列表数据
  headerState: PropTypes.string,
  footerState: PropTypes.string,
};

RefreshListView.defaultProps = {
  onHeaderRefresh: () => null, // 下拉刷新的方法
  onFooterRefresh: () => null, // 上拉加载的方法
  data: [], // 列表数据
  headerState: RefreshState.Idle,
  footerState: RefreshState.Idle,
};

export default RefreshListView;
