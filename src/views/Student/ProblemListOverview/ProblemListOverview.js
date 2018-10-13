// 错题列表详情页
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMistakeList } from '../../../actions/mistakeListAction';
import { initialFetch } from '../../../actions/problemRecordsAction';
import styles from './ProblemListOverview.scss';
import { CustomButton } from '../../../components/Icon';
import FilterView from './Components/FilterView';
import ProblemList from './ProblemList';
import ExtendListView from '../../../components/ExtendListView';
import SelectListButton from '../ProblemRecords/Components/SelectListButton';

@connect((state) => {
  const {
    mistakeListReducer: {
      mistakeList,
    },
    problemOverviewReducer: {
      data,
    },
    ProblemRecordsReducer: {
      // 年级
      allGradeData,
    },
  } = state;

  return {
    mistakeList,
    problemOverviewData: data,
    allGradeData,
  };
}, dispatch => ({
  onGetMistakeList: bindActionCreators(getMistakeList, dispatch),
  getGrades: bindActionCreators(initialFetch, dispatch),
}))
class ProblemListOverview extends Component {
  static propTypes = {
    onGetMistakeList: PropTypes.func.isRequired,
    subjectId: PropTypes.string.isRequired,
    problemOverviewData: PropTypes.array.isRequired,
    mistakeList: PropTypes.array.isRequired,
    allGradeData: PropTypes.array.isRequired,
    getGrades: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { problemOverviewData, subjectId } = props;
    this.state = {
      showExtendView: false,
      subjectData: problemOverviewData,
      currentSubjectId: subjectId,
    };
    this.moreParams = {
      uniGradeId: [],
      category: [],
      difficultyLevel: [],
    };
    this.category = [
      { id: 1, text: '作业' },
      { id: 2, text: '考试' },
    ];
    this.difficultyLevel = [
      { id: 1, text: '易' },
      { id: 2, text: '适中' },
      { id: 3, text: '难' },
    ];
  }

  componentDidMount() {
    const { onGetMistakeList, subjectId, getGrades } = this.props;
    console.log(53, 'componentDidMount', subjectId);
    onGetMistakeList({
      params: { subjectId },
    });
    getGrades({ currentRecordType: 0 }, 'REQUEST');
  }

  // 点击头部隐藏更多筛选层
  onTopClickFun = () => {
    const { showExtendView } = this.state;
    if (showExtendView) {
      this.setVisibleFun(false);
    }
  }

  getMoreParms = (Arr, objKey) => {
    const { onGetMistakeList } = this.props;
    const { currentSubjectId } = this.state;
    this.moreParams[objKey] = Arr;
    console.log(this.moreParams);

    const { category, difficultyLevel, uniGradeId } = this.moreParams;
    const params = {
      subjectId: currentSubjectId,
      difficultyLevel,
      uniGradeId: uniGradeId[0],
    };
    if (category.length === 1) {
      Object.assign(params, {
        category: category[0],
      });
    }

    onGetMistakeList({ params });
  }

  // 控制更多筛选层的显隐
  setVisibleFun = (visible) => {
    this.setState({
      showExtendView: visible,
    });
  }

  // 点击学科筛选
  filterSubjectFun = (subjectId) => {
    const { showExtendView } = this.state;
    const { onGetMistakeList } = this.props;
    if (showExtendView) {
      this.setVisibleFun(false);
    }
    this.setState({
      currentSubjectId: subjectId,
    });
    onGetMistakeList({
      params: { subjectId },
    });
  }

  // 点击更多筛选
  filterMoreFun = () => {
    const { showExtendView } = this.state;
    this.setVisibleFun(!showExtendView);
  }

  // 渲染需要展示在扩展列表视图中的组件
  renderFilterView = () => {
    const { allGradeData } = this.props;
    console.log(1200, allGradeData);
    return (
      <View style={styles.renderFilterView}>
        <SelectListButton
          getItems={this.getMoreParms}
          data={allGradeData}
          title="全部年级"
          objKey="uniGradeId"
          selectType="single"
          selected={this.moreParams.uniGradeId}
        />
        <SelectListButton
          getItems={this.getMoreParms}
          data={this.category}
          title="全部来源"
          objKey="category"
          selectType="multi"
          selected={this.moreParams.category}
        />
        <SelectListButton
          getItems={this.getMoreParms}
          data={this.difficultyLevel}
          title="全部标签"
          objKey="difficultyLevel"
          selectType="multi"
          selected={this.moreParams.difficultyLevel}
        />
      </View>
    );
  }

  render() {
    const {
      showExtendView, currentSubjectId, subjectData,
    } = this.state;
    const { mistakeList } = this.props;
    return (
      <View style={styles.problemList_container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.problemList_top}
          onPress={this.onTopClickFun}
        >
          <View style={styles.problemList_header}>
            <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.ProblemOverview} />
            <Text style={styles.doHomeworkTitle}>作业名称</Text>
            <Text />
          </View>
        </TouchableOpacity>
        <FilterView
          currentSubjectId={currentSubjectId}
          subjectData={subjectData}
          filterSubjectFun={this.filterSubjectFun}
          filterMoreFun={this.filterMoreFun}
        />
        <ProblemList mistakeList={mistakeList} />
        {
          showExtendView && (
          <ExtendListView setVisibleFun={this.setVisibleFun} setTop={144}>
            {this.renderFilterView()}
          </ExtendListView>
          )
         }
      </View>
    );
  }
}

export default ProblemListOverview;
