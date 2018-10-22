import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'ramda';
import styles from './problemRecords.scss';
import FilterBox from './Components/filterBox';
import RecordList from './recordList';
import I18nText from '../../../components/I18nText';
import ExtendListView from '../../../components/ExtendListView';
import freshListViewSate from '../../../components/RefreshListView/RefreshState';
import SelectListButton from './Components/SelectListButton';
import * as actions from '../../../actions/problemRecordsAction';
import noRecords from '../../../public/img/noRecords.png';
import NoResult from '../../../components/NotResult';


class ProblemRecords extends Component {
  constructor(props) {
    super(props);
    const { actions: { initialFetch } } = props;
    // 初始化，默认作业页面
    initialFetch({ currentRecordType: 0 }, 'REQUEST');
    // 拿下拉刷新的context,父组件使用子组件方法
    this.listVew = null;
    this.page = 1;
    // 下拉刷新需要的参数
    this.moreParams = {
      allGrade: [],
      recordState: [],
      isRevising: [],
    };
    // 检测参数是否变化的临时变量,不知道后台设置的参数的值是否有重复的，有的话重置参数也要重置这个。不然等于的话就发送不出去了。
    this.preMoreParams = {
      allGrade: [],
      recordState: [],
      isRevising: [],
    };
    this.state = {
      showExtendView: false,
      currentRecordType: 0, // 默认为作业记录
      currentSubjectId: 'allSub',
      // 这个数到时reducer数据直接替换就行了
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }


  // 控制更多筛选层的显隐
  setVisibleFun = (visible) => {
    this.setState({
      showExtendView: visible,
    });
  }


  getRefreshListView=(ref) => {
    this.listVew = ref;
  }

  /**
 * 每次更换科目或者作业考试切换的时候要清空this.moreParams..更多筛选的数据
 */
  getMoreParms=(Arr, objKey) => {
    this.moreParams[objKey] = Arr;
    console.log(this.moreParams);
  }

  /**
 * 下面这3个函数很相似，但是不想传参了。分开请求号了，reducer也不用处理。还是独立请求比较方便。
 */
  // 这个是切换头部作业或考试的，完全要重新初始化的
  opreatedFetch=(args) => {
    // changeParamsfresh
    const { actions: { initialFetch } } = this.props;
    const params = {
      ...args,
    };
    initialFetch(params, 'REQUEST');
  }

  dropDownFetch=(args) => {
    const { actions: { dropDownRefresh } } = this.props;
    const params = {
      ...args,
    };
    dropDownRefresh(params, 'REQUEST');
  }

  changeParamsfetch=(args) => {
    const { actions: { changeParamsfresh } } = this.props;
    const params = {
      ...args,
    };
    changeParamsfresh(params, 'REQUEST');
  }

  // 切换作业记录和考试记录
  switchRecord = (type) => {
    const { showExtendView } = this.state;
    // const { actions: { initialFetch } } = this.props;
    if (showExtendView) {
      this.setVisibleFun(false);
    }
    // 这些参数重置
    this.page = 1;
    this.moreParams = {
      allGrade: [],
      recordState: [],
      isRevising: [],
    };
    // 回调，切换时需要重新获取筛选数据
    this.setState({
      currentRecordType: type,
      currentSubjectId: 'allSub',
    }, () => this.opreatedFetch({
      currentRecordType: type, currentSubjectId: 0, ...this.moreParams, page: 1,
    }));

    // 清空下拉刷新组件的状态，恢复默认
    this.listVew.setheaderState(freshListViewSate.Idle);
    this.listVew.setfooterState(freshListViewSate.Idle);
  }

    // 点击学科筛选
    // 筛选参数重置
    filterSubjectFun = (subjectId) => {
      const { showExtendView, currentRecordType } = this.state;
      if (showExtendView) {
        this.setVisibleFun(false);
      }
      // 这些参数重置
      this.page = 1;
      this.moreParams = {
        allGrade: [],
        recordState: [],
        isRevising: [],
      };
      this.setState({
        currentSubjectId: subjectId,
      }, () => this.changeParamsfetch({
        currentRecordType, currentSubjectId: subjectId, ...this.moreParams, page: 1,
      }));
    }


  // 点击更多筛选（开关都在这里）
  filterMoreFun = () => {
    const { showExtendView, currentRecordType, currentSubjectId } = this.state;
    // 检测参数变化
    const isChange = _.equals(this.preMoreParams, this.moreParams);

    if (showExtendView && !isChange) {
      this.page = 1;
      this.changeParamsfetch({
        currentRecordType, currentSubjectId, ...this.moreParams, page: 1,
      });
      this.preMoreParams = Object.assign({}, this.moreParams);
    }
    this.setVisibleFun(!showExtendView);
  }

  // 点击头部隐藏更多筛选层
  clickTopFun = () => {
    const { showExtendView, currentRecordType, currentSubjectId } = this.state;
    const isChange = _.equals(this.preMoreParams, this.moreParams);
    if (showExtendView && !isChange) {
      this.page = 1;
      this.changeParamsfetch({
        currentRecordType, currentSubjectId, ...this.moreParams, page: 1,
      });
      this.preMoreParams = Object.assign({}, this.moreParams);
    }
    if (showExtendView) {
      this.setVisibleFun(false);
    }
  }

  // 下拉刷新
  // Idle: 'Idle', // 初始状态，无刷新/无加载的情况
  // CanLoadMore: 'CanLoadMore', // 可以加载更多，表示列表还有数据可以继续加载
  // Refreshing: 'Refreshing', // 正在刷新中/正在加载
  // NoMoreData: 'NoMoreData', // 加载完成，没有更多数据了
  // Failure: 'Failure', // 刷新失败/加载失败
  // RefreshSuccess: 'RefreshSuccess', // 刷新成功
  dropDownRefresh=() => {
    const { currentRecordType, currentSubjectId } = this.state;
    this.listVew.setheaderState(freshListViewSate.Refreshing);
    this.page = 1;
    this.changeParamsfetch({

      currentRecordType,
      currentSubjectId,
      ...this.moreParams,
      page: 1,
      callback: () => this.listVew.setheaderState(freshListViewSate.RefreshSuccess).setheaderState(freshListViewSate.Idle),
    });

    console.log('曹尼玛的垃圾组件');
  }

  upPullGetMore=() => {
    const { currentRecordType, currentSubjectId } = this.state;
    const { recordData, total } = this.props;
    console.log(total, recordData.length);
    console.log(recordData);
    if (recordData.length === total) {
      this.listVew.setfooterState(freshListViewSate.NoMoreData);
      return;
    }
    this.listVew.setfooterState(freshListViewSate.Refreshing);
    this.dropDownFetch({

      currentRecordType,
      currentSubjectId,
      ...this.moreParams,
      page: ++this.page,

      callback: () => this.listVew.setfooterState(freshListViewSate.RefreshSuccess).setfooterState(freshListViewSate.Idle),
    });
  }

  // 点击卡片进入对应的作业/考试详情页
  // 去到那边需要格式化时间和考试名字，在这里带过去就好了。
  gotoDetailFun = (id, time, title) => {
    const { currentRecordType } = this.state;
    if (currentRecordType) {
      // 进入考试详情页
      Actions.ExamRecordDetail({ id, time, title });
    } else {
      // 进入作业详情页
      Actions.HomworkRecordDetail({ id, time, title });
    }
  }

  // 渲染需要展示在扩展列表视图中的组件
  // allGrade: [],
  // recordState: [],
  // isRevising: [],
  renderFilterView = (currentRecordType) => {
    const { allGradeData, recordStateData, isRevisingData } = this.props;
    return (
      <View style={styles.renderFilterView}>
        <SelectListButton
          getItems={this.getMoreParms}
          data={allGradeData}
          title="全部年级"
          objKey="allGrade"
          selectType="single"
          selected={this.moreParams.allGrade}
        />
        <SelectListButton
          getItems={this.getMoreParms}
          data={recordStateData}
          title="作业状态"
          objKey="recordState"
          selectType="multi"
          selected={this.moreParams.recordState}
        />
        {
        currentRecordType === 0 ? (
          <SelectListButton
            getItems={this.getMoreParms}
            data={isRevisingData}
            title="是否订正"
            objKey="isRevising"
            selectType="multi"
            selected={this.moreParams.isRevising}
          />
        ) : <View style={styles.nullView} />}
      </View>
    );
  }

  renderContent=() => {
    const { subjectData, recordData } = this.props;
    // if (_.isEmpty(subjectData)) {
    //   return null;
    // }
    // if (_.isEmpty(recordData)) {
    //   return <Text>YOU HAVE NOT DATA</Text>;
    // }
    const {
      currentRecordType, showExtendView, currentSubjectId,
    } = this.state;
    return (
      <React.Fragment>
        <FilterBox
          currentSubjectId={currentSubjectId}
          subjectData={subjectData}
          filterSubjectFun={this.filterSubjectFun}
          filterMoreFun={this.filterMoreFun}
        />
        <RecordList
          dataList={recordData}
          gotoDetailFun={this.gotoDetailFun}
          getRefreshListView={this.getRefreshListView}
          recordType={currentRecordType}
          dropDownRefresh={this.dropDownRefresh}
          upPullGetMore={this.upPullGetMore}
        />
        {
          // 这个170并不是所有屏幕都对的
          showExtendView && (
          <ExtendListView setVisibleFun={this.filterMoreFun} setTop={170}>
            {
              this.renderFilterView(currentRecordType)
            }
          </ExtendListView>
          )
         }
      </React.Fragment>
    );
  }

  renderNodataOrLoading=() => {
    // 预留出来，Loading缓冲处理
  }


  render() {
    const { subjectData } = this.props;
    // TODO:Laoding状态下是应该返回null的
    // if (_.isEmpty(subjectData)) {
    //   return null;
    // }
    // if (_.isEmpty(recordData)) {
    //   return <Text>YOU HAVE NOT DATA</Text>;
    // }
    const {
      currentRecordType,
    } = this.state;

    return (
      <View style={styles.recordsContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.recordsSwitch}
          onPress={this.clickTopFun}
        >
          <TouchableOpacity
            style={[styles.recordBox, styles.homeWorkRecord, (currentRecordType === 0 && styles.currentRecord)]}
            onPress={() => this.switchRecord(0)}
          >
            <I18nText style={[styles.recordText, styles.homeWorkText, (currentRecordType === 0 && styles.currentText)]}>
              ProblemRecords.header.homeworkRecord
            </I18nText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.recordBox, styles.examRecord, (currentRecordType === 1 && styles.currentRecord)]}
            onPress={() => this.switchRecord(1)}
          >
            <I18nText style={[styles.recordText, styles.examText, (currentRecordType === 1 && styles.currentText)]}>
              ProblemRecords.header.exanRecord
            </I18nText>
          </TouchableOpacity>
        </TouchableOpacity>
        {
          _.isEmpty(subjectData) ? <NoResult tips="暂无记录" url={noRecords} /> : this.renderContent()
        }
      </View>
    );
  }
}


ProblemRecords.propTypes = {
  subjectData: PropTypes.array.isRequired,
  recordData: PropTypes.array.isRequired,
  actions: PropTypes.any.isRequired,
  allGradeData: PropTypes.array.isRequired,
  recordStateData: PropTypes.array.isRequired,
  isRevisingData: PropTypes.array.isRequired,
  total: PropTypes.any.isRequired,
};

ProblemRecords.defaultProps = {
  // allGrade, recordStateData, isRevising
};

const mapStateToProps = (state) => {
  const {
    ProblemRecordsReducer: {
      subjectData,
      // 记录数据
      recordData,
      // 年级
      allGradeData,
      // 批改状态
      recordStateData,
      // 修正状态
      isRevisingData,
      total,
    },
  } = state;
  return {
    subjectData,
    recordData,
    allGradeData,
    recordStateData,
    isRevisingData,
    total,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProblemRecords);
