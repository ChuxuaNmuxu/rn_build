import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import RefreshListView from '../../../components/RefreshListView';
// import RefreshState from '../../../components/RefreshListView/RefreshState';
import ProblemCard from './Components/ProblemCard';
// import { addMistakeList } from '../../../actions/mistakeListAction';

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.page = 1;
  }

  componentDidMount() {
    const { getRefreshListView } = this.props;
    getRefreshListView(this.listView);
  }

  _keyExtractor = item => item.id;

  // 渲染子组件
  _renderItem = ({ item, index }) => {
    const { currentSubjectId } = this.props;
    return (
      <ProblemCard
        currentSubjectId={currentSubjectId}
        key={index}
        index={index}
        id={item.id}
        datas={item}
      />
    );
  }

   // 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
   _renderEmptyView = item => <View data={item} />;

   render() {
     const { mistakeList, onHeaderRefresh, onFooterRefresh } = this.props;
     return (
       <RefreshListView
         ref={(ref) => { this.listView = ref; }}
         data={mistakeList}
         renderItem={this._renderItem}
         keyExtractor={this._keyExtractor} // 组件里面都没用
         ListEmptyComponent={this._renderEmptyView}
         onHeaderRefresh={onHeaderRefresh}
         onFooterRefresh={onFooterRefresh}
       />
     );
   }
}

ProblemList.propTypes = {
  // total: PropTypes.number.isRequired,
  getRefreshListView: PropTypes.func.isRequired,
  onHeaderRefresh: PropTypes.func.isRequired,
  onFooterRefresh: PropTypes.func.isRequired,
  mistakeList: PropTypes.array.isRequired,
  // refreshList: PropTypes.func.isRequired,
  currentSubjectId: PropTypes.string.isRequired,
  // controlFetch: PropTypes.bool.isRequired,
};

export default ProblemList;
