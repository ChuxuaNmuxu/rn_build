// 错题列表详情页
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  // ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMistakeListAction } from '../../../actions/mistakeListAction';
import { initialFetch } from '../../../actions/problemRecordsAction';
import styles from './ProblemListOverview.scss';
import I18nText from '../../../components/I18nText';
import { CustomButton } from '../../../components/Icon';
import FilterView from './Components/FilterView';
import ProblemList from './ProblemList';
import ExtendListView from '../../../components/ExtendListView';
import SelectListButton from '../ProblemRecords/Components/SelectListButton';
import { getRandomArrayItem } from '../../../utils/common';

class ProblemListOverview extends Component {
  constructor(props) {
    super(props);
    const { problemOverviewData, subjectId } = props;
    this.state = {
      showExtendView: false,
      subjectData: problemOverviewData,
      currentSubjectId: subjectId,
      difficultyLevelVisible: false, // 控制难易度的标签 选中作业是时候才显示
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
      { id: 5, text: '适中' },
      { id: 9, text: '难' },
    ];
  }

  componentDidMount() {
    console.log('调用 ProblemListOverview 组件', this.props);
    const { getGrades } = this.props;
    this.refreshList();
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
    this.moreParams[objKey] = Arr;
    // console.log(67, Arr, objKey, this.moreParams);
    // 控制难易度的标签 选中作业是时候才显示 objKey === category && category.includes(1)
    if (this.moreParams.category.includes(1)) {
      this.setState({ difficultyLevelVisible: true }, () => this.refreshList());
    } else {
      // 如果没有的话，要清空 difficultyLevel
      this.moreParams.difficultyLevel = [];
      this.setState({ difficultyLevelVisible: false }, () => this.refreshList());
    }
  }

  // 控制更多筛选层的显隐
  setVisibleFun = (visible) => {
    this.setState({
      showExtendView: visible,
    });
  }

  refreshList = (params = {}, successFn, failureFn, action) => {
    const { onGetMistakeList } = this.props;
    const { currentSubjectId } = this.state;
    const { category, difficultyLevel, uniGradeId } = this.moreParams;
    const initParams = {
      subjectId: currentSubjectId,
      uniGradeId: uniGradeId[0],
      page: 1,
      pageSize: 20,
    };

    if (difficultyLevel.length > 0) {
      initParams.difficultyLevel = difficultyLevel.join(); // 按后台格式来 Array[int]
    }

    if (category.length === 1) {
      Object.assign(initParams, {
        category: category[0],
      });
    }
    // 最终的请求参数
    const fetchParams = Object.assign(initParams, params);
    // console.log(94, fetchParams);
    onGetMistakeList({
      params: fetchParams,
      successFn,
      failureFn,
      action,
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

  // 前往随机错题重做(传5个随机的数据过去)
  randomMistakeReform = (list) => {
    const { currentSubjectId } = this.state;
    const datas = getRandomArrayItem(list, 5);
    console.log('原数组list=', list, '随鸡5到题', datas);
    Actions.MistakeReform({
      problemCardInfo: datas,
      subjectId: currentSubjectId, // 回来的时候重新请求数据用的
      isRandom: true, // 用来判断是否是随机，不是的时候删除错题本成功后调回此页面
    });
  }

  // 渲染需要展示在扩展列表视图中的组件
  renderFilterView = () => {
    const { allGradeData } = this.props;
    const { difficultyLevelVisible } = this.state;
    // console.log(1200, allGradeData);
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
        {
          difficultyLevelVisible ? (
            <SelectListButton
              getItems={this.getMoreParms}
              data={this.difficultyLevel}
              title="全部标签"
              objKey="difficultyLevel"
              selectType="multi"
              selected={this.moreParams.difficultyLevel}
            />
          ) : null
        }
      </View>
    );
  }

  render() {
    const {
      showExtendView, currentSubjectId, subjectData,
    } = this.state;
    const { mistakeList, total } = this.props;
    return (
      <View style={styles.problemList_container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.problemList_top}
          onPress={this.onTopClickFun}
        >
          <View style={styles.problemList_header}>
            <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.ProblemOverview} />
            <I18nText style={styles.doHomeworkTitle}>ProblemListOverview.title</I18nText>
            <Text />
          </View>
        </TouchableOpacity>
        <FilterView
          currentSubjectId={currentSubjectId}
          subjectData={subjectData}
          filterSubjectFun={this.filterSubjectFun}
          filterMoreFun={this.filterMoreFun}
        />
        {/* <ScrollView> */}
        <ProblemList
          refreshList={this.refreshList}
          mistakeList={mistakeList}
          total={total}
          currentSubjectId={currentSubjectId}
        />
        {/* </ScrollView> */}
        {
          // 更多筛选
          showExtendView && (
          <ExtendListView setVisibleFun={this.setVisibleFun} setTop={144}>
            {this.renderFilterView()}
          </ExtendListView>
          )
        }
        {/* <View style={{ height: 160 }} /> */}
        <View style={styles.random_style}>
          <Text style={styles.random_btn_normal}>{`<共${mistakeList.length}题>`}</Text>
          <TouchableOpacity disabled={mistakeList.length === 0} onPress={() => this.randomMistakeReform(mistakeList)}>
            <I18nText style={styles.random_btn}>
            ProblemListOverview.random_mistake_reform
            </I18nText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ProblemListOverview.propTypes = {
  total: PropTypes.number.isRequired, // 后台记录的总长度，用于判断能否刷新
  onGetMistakeList: PropTypes.func.isRequired,
  subjectId: PropTypes.string.isRequired,
  problemOverviewData: PropTypes.array.isRequired,
  mistakeList: PropTypes.array.isRequired,
  allGradeData: PropTypes.array.isRequired,
  getGrades: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    mistakeListReducer: {
      mistakeList,
      total,
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
    total,
    problemOverviewData: data,
    allGradeData,
  };
};
const mapDispatchToProps = dispatch => ({
  onGetMistakeList: bindActionCreators(getMistakeListAction, dispatch),
  getGrades: bindActionCreators(initialFetch, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemListOverview);
