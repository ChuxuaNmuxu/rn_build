import React, { Component } from 'react';
import {
  View,
  // Text,
  TouchableOpacity,
} from 'react-native';
import styles from './problemRecords.scss';
import FilterBox from './Components/filterBox';
import RecordList from './recordList';
import I18nText from '../../../components/I18nText';
import ExtendListView from '../../../components/ExtendListView';
import freshListViewSate from '../../../components/RefreshListView/RefreshState';
import SelectListButton from './Components/SelectListButton';


class ProblemRecords extends Component {
  constructor(props) {
    super(props);
    this.listVew = null;
    this.moreParams = {
      allGrade: [],
      recordState: [],
      isRevising: [],
    };
    this.state = {
      showExtendView: false,
      currentRecordType: 0, // 默认为作业记录
      subjectData: [{ // 筛选数据
        subjectId: 0,
        subjectName: '全部学科',
      }, {
        subjectId: 1,
        subjectName: '语文',
      }, {
        subjectId: 2,
        subjectName: '数学',
      }, {
        subjectId: 3,
        subjectName: '英语',
      }, {
        subjectId: 4,
        subjectName: '历史',
      }, {
        subjectId: 5,
        subjectName: '地理',
      }, {
        subjectId: 6,
        subjectName: '语文6',
      }, {
        subjectId: 7,
        subjectName: '数学7',
      }, {
        subjectId: 8,
        subjectName: '英语8',
      }, {
        subjectId: 9,
        subjectName: '历史9',
      }, {
        subjectId: 10,
        subjectName: '地理10',
      }, {
        subjectId: 11,
        subjectName: '英语11',
      }, {
        subjectId: 12,
        subjectName: '历史12',
      }, {
        subjectId: 13,
        subjectName: '地理13',
      }],
      currentSubjectId: 0,
      // 这个数到时reducer数据直接替换就行了
      recordData: [{ // 记录的数据
        id: '0',
        subjectName: '语文',
        title: '语文作业',
        accuracy: '0.5882',
        resultRead: '0',
        publishTime: '2018-08-16T11:27:09+08:00',
        type: '0',
      }, {
        id: '1',
        subjectName: '生物',
        title: '生物作业',
        accuracy: '0.4555',
        resultRead: '1',
        publishTime: '2018-08-16T11:27:09+08:00',
        type: '1',
      }, {
        id: '2',
        subjectName: '化学',
        title: '化学作业',
        accuracy: '0.9866',
        resultRead: '0',
        publishTime: '2018-08-16T11:27:09+08:00',
        type: '2',
      }, {
        id: '3',
        subjectName: '英语',
        title: '英语作业',
        accuracy: '0.2323',
        resultRead: '1',
        publishTime: '2018-09-03T11:27:09+08:00',
        type: '0',
      }, {
        id: '4',
        subjectName: '音乐',
        title: '音乐作业',
        accuracy: '1',
        resultRead: '1',
        publishTime: '2018-09-03T11:27:09+08:00',
        type: '2',
      }, {
        id: '5',
        subjectName: '物理',
        title: '物理作业',
        accuracy: '1',
        resultRead: '1',
        publishTime: '2018-09-03T11:27:09+08:00',
        type: '1',
      }],
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


  // 切换作业记录和考试记录
  switchRecord = (type) => {
    const { showExtendView } = this.state;
    if (showExtendView) {
      this.setVisibleFun(false);
    }
    this.setState({
      currentRecordType: type,
    });
    // 应该有个saga去请求数据

    // 清空下拉刷新组件的状态，恢复默认
    this.listVew.setheaderState(freshListViewSate.Idle);
    this.listVew.setfooterState(freshListViewSate.Idle);
  }

    // 点击学科筛选
    filterSubjectFun = (subjectId) => {
      const { showExtendView } = this.state;
      if (showExtendView) {
        this.setVisibleFun(false);
      }
      this.setState({
        currentSubjectId: subjectId,
      });
    }


  // 点击更多筛选
  filterMoreFun = () => {
    const { showExtendView } = this.state;
    this.setVisibleFun(!showExtendView);
  }

    // 点击头部隐藏更多筛选层
    clickTopFun = () => {
      const { showExtendView } = this.state;
      if (showExtendView) {
        this.setVisibleFun(false);
      }
    }


  // 点击卡片进入对应的作业/考试详情页
  gotoDetailFun = (id) => {
    const { currentRecordType } = this.state;
    if (currentRecordType) {
      // 进入考试详情页
      Actions.ExamRecordDetail({ id });
    } else {
      // 进入作业详情页
      Actions.HomworkRecordDetail({ id });
    }
  }

  // 渲染需要展示在扩展列表视图中的组件
  // allGrade: [],
  // recordState: [],
  // isRevising: [],
  renderFilterView = currentRecordType => (
    <View style={styles.renderFilterView}>
      <SelectListButton
        getItems={this.getMoreParms}
        data={[{ id: 1, text: '一年级' }, { id: 2, text: '二年级' }, { id: 3, text: '九年级' }, { id: 4, text: '六年级' }]}
        title="全部年级"
        objKey="allGrade"
        selectType="single"
      />
      <SelectListButton
        getItems={this.getMoreParms}
        data={[{ id: 5, text: currentRecordType === 0 ? '未提交' : '未参加' }, { id: 6, text: '批改中' }, { id: 7, text: '未批改' }]}
        title="作业状态"
        objKey="recordState"
        selectType="multi"
      />
      {
        currentRecordType === 0 ? (
          <SelectListButton
            getItems={this.getMoreParms}
            data={[{ id: 8, text: '已订正' }, { id: 9, text: '未订正' }]}
            title="是否订正"
            objKey="isRevising"
            selectType="multi"
          />
        ) : <View style={styles.nullView} />}
    </View>
  )


  render() {
    const {
      currentRecordType, recordData, showExtendView, currentSubjectId, subjectData,
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
        />
        {
          // 这个170并不是所有屏幕都对的
          showExtendView && (
          <ExtendListView setVisibleFun={this.setVisibleFun} setTop={170}>
            {
              this.renderFilterView(currentRecordType)
            }
          </ExtendListView>
          )
         }
      </View>
    );
  }
}


export default ProblemRecords;
