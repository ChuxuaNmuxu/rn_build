import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import RefreshListView from '../../../components/RefreshListView';
import RefreshState from '../../../components/RefreshListView/RefreshState';
import ProblemCard from './Components/ProblemCard';
import { addMistakeList } from '../../../actions/mistakeListAction';

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.page = 1;
  }

  _keyExtractor = (item, index) => item.id;

  // 渲染子组件
  _renderItem = ({ item, index }) => (
    <ProblemCard
      key={index}
      index={index}
      id={item.id}
      datas={item}
    />
  );

   // 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
   _renderEmptyView = item => <View />;

  // 加载更多
  RefreshListFunc = () => {
    const { refreshList } = this.props;
    refreshList({}, () => {
      console.log(38);
      this.listView.endHeaderRefreshing(RefreshState.RefreshSuccess);
      this.listView.endHeaderRefreshing(RefreshState.Idle);
    }, () => {
      this.listView.endHeaderRefreshing(RefreshState.Failure);
    });
  }

  // 刷新
  loadMoreFun = () => {
    const { refreshList } = this.props;
    refreshList({ page: ++this.page }, () => {
      this.listView.endRefreshing(RefreshState.NoMoreData);
    }, () => {
      this.listView.endRefreshing(RefreshState.NoMoreData);
    }, addMistakeList);
  }

  render() {
    const { mistakeList } = this.props;
    return (
      <RefreshListView
        ref={(ref) => { this.listView = ref; }}
        data={mistakeList}
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
  mistakeList: PropTypes.array.isRequired,
  refreshList: PropTypes.func.isRequired,
};

export default ProblemList;
