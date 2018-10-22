import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import _ from 'ramda';
import RefreshListView from '../../../components/RefreshListView';
import noRecords from '../../../public/img/noRecords.png';
import NoResult from '../../../components/NotResult';

// import RefreshState from '../../../components/RefreshListView/RefreshState';
import RecordCard from './Components/recordCard';

class RecordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { getRefreshListView } = this.props;
    getRefreshListView(this.listView);
  }

  _keyExtractor = item => item.id + Math.random();

  // 渲染子组件
  _renderItem = ({ item, index }) => {
    const { gotoDetailFun, recordType } = this.props;
    return (
      <RecordCard
        key={recordType === 0 ? `index${index}` : `cao${index}`}
        id={item.id}
        datas={item}
        gotoDetailFun={gotoDetailFun}
        recordType={recordType}
      />
    );
  };

   // 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
   _renderEmptyView = item => <View data={item} />;

  // 上拉加载更多
  loadMoreFun = () => {
    const { upPullGetMore } = this.props;
    upPullGetMore();
    console.log('???????????????????');
    // setTimeout(() => {
    //   this.listView.endRefreshing(RefreshState.NoMoreData);
    // }, 2000);
  }

  // 下拉刷新
  RefreshListFunc = () => {
    console.log('???????????????????');
    const { dropDownRefresh } = this.props;
    dropDownRefresh();
    // setTimeout(() => {
    //   this.listView.endHeaderRefreshing(RefreshState.Failure);
    //   // 刷新成功后隐藏提示
    //   // setTimeout(() => {
    //   //   this.listView.endHeaderRefreshing(RefreshState.Idle);
    //   // }, 1000);
    // }, 2000);
  }

  render() {
    const { dataList } = this.props;
    if (_.isEmpty(dataList)) {
      return <NoResult tips="暂无记录" url={noRecords} />;
    }
    return (
      <RefreshListView
        ref={(ref) => { this.listView = ref; }}
        data={dataList}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyView}
        onHeaderRefresh={this.RefreshListFunc}
        onFooterRefresh={this.loadMoreFun}
      />
    );
  }
}

RecordList.propTypes = {
  dataList: PropTypes.array.isRequired,
  gotoDetailFun: PropTypes.func.isRequired,
  getRefreshListView: PropTypes.func.isRequired,
  recordType: PropTypes.number.isRequired,
  dropDownRefresh: PropTypes.func.isRequired,
  upPullGetMore: PropTypes.func.isRequired,
};

export default RecordList;
