import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import RefreshListView from '../../../components/RefreshListView';
import RefreshState from '../../../components/RefreshListView/RefreshState';
import ProblemCard from './Components/ProblemCard';

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _keyExtractor = (item, index) => item.id;

  // 渲染子组件
  _renderItem = ({ item, index }) => (
    <ProblemCard
      key={index}
      id={item.id}
      datas={item}
    />
  );

   // 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
   _renderEmptyView = item => <View />;

  // 上拉加载更多
  loadMoreFun = () => {
    setTimeout(() => {
      this.listView.endRefreshing(RefreshState.NoMoreData);
    }, 2000);
  }

  // 下拉刷新
  RefreshListFunc = () => {
    setTimeout(() => {
      this.listView.endHeaderRefreshing(RefreshState.Failure);
      // 刷新成功后隐藏提示
      // setTimeout(() => {
      //   this.listView.endHeaderRefreshing(RefreshState.Idle);
      // }, 1000);
    }, 2000);
  }

  render() {
    const { problemData } = this.props;
    return (
      <RefreshListView
        ref={(ref) => { this.listView = ref; }}
        data={problemData}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyView}
        onHeaderRefresh={() => this.RefreshListFunc()}
        onFooterRefresh={() => this.loadMoreFun()}
      />
    );
  }
}

ProblemList.propTypes = {
  problemData: PropTypes.array.isRequired,
};

export default ProblemList;
