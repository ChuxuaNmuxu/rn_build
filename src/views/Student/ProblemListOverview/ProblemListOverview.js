// 错题列表详情页
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './ProblemListOverview.scss';
import { CustomButton } from '../../../components/Icon';
import FilterView from './Components/FilterView';
import ProblemList from './ProblemList';
import ExtendListView from '../../../components/ExtendListView';

class ProblemListOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtendView: false,
      subjectData: [{ // 筛选数据
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
      currentSubjectId: 1,
      // problemData: [{ // 错题模拟数据
      //   id: '1',
      //   questionNum: 1,
      //   difficultyLevel: 1,
      //   type: 1,
      //   content: '第一题内容',
      //   publishTime: '2018-08-16T11:27:09+08:00',
      // }, {
      //   id: '2',
      //   questionNum: 2,
      //   difficultyLevel: 5,
      //   type: 2,
      //   content: '第二题内容',
      //   publishTime: '2018-08-16T11:27:09+08:00',
      // }, {
      //   id: '3',
      //   questionNum: 3,
      //   difficultyLevel: 9,
      //   type: 3,
      //   content: '第三题内容',
      //   publishTime: '2018-08-16T11:27:09+08:00',
      // }, {
      //   id: '4',
      //   questionNum: 4,
      //   type: 4,
      //   content: '第四题内容',
      //   publishTime: '2018-08-16T11:27:09+08:00',
      // }],
      problemData: [
        {
          id: '455676721924931584',
          classId: '11',
          type: 4,
          subType: null,
          optionCount: 4,
          explainFlag: null,
          explainAudioId: null,
          explainAudioDuration: null,
          explainImageId: null,
          explainAudioUrl: null,
          explainImageUrl: null,
          explainThumbUrl: null,
          failReason: 0,
          explainContent: null,
          content: '{"blocks":[{"key":"69u5m","text":"对应题ABCD","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          materialContent: null,
          answerContent: null,
          classMatesAnswers: [],
          category: 1,
          title: null,
          difficultyLevel: 0,
          name: '测试材料作业',
          publishTime: '2018-06-11T10:16:36+08:00',
          homeworkId: null,
          examId: null,
          parentId: '455676721916542976',
          homeworkExamId: '455676721555832832',
        },
        {
          id: '455676721933320192',
          classId: '11',
          type: 1,
          subType: null,
          optionCount: 4,
          explainFlag: null,
          explainAudioId: null,
          explainAudioDuration: null,
          explainImageId: null,
          explainAudioUrl: null,
          explainImageUrl: null,
          explainThumbUrl: null,
          failReason: 0,
          explainContent: null,
          content: '{"blocks":[{"key":"65jmd","text":"单选题","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          materialContent: null,
          answerContent: null,
          classMatesAnswers: [],
          category: 1,
          title: null,
          difficultyLevel: 0,
          name: '测试材料作业',
          publishTime: '2018-06-11T10:16:36+08:00',
          homeworkId: null,
          examId: null,
          parentId: '455676721916542976',
          homeworkExamId: '455676721555832832',
        },
        {
          id: '455679873348796416',
          classId: '11',
          type: 4,
          subType: null,
          optionCount: 4,
          explainFlag: null,
          explainAudioId: null,
          explainAudioDuration: null,
          explainImageId: null,
          explainAudioUrl: null,
          explainImageUrl: null,
          explainThumbUrl: null,
          failReason: 0,
          explainContent: null,
          content: '{"blocks":[{"key":"7d23r","text":"32131","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          materialContent: null,
          answerContent: null,
          classMatesAnswers: [],
          category: 1,
          title: null,
          difficultyLevel: 0,
          name: '2111111',
          publishTime: '2018-06-11T10:29:08+08:00',
          homeworkId: null,
          examId: null,
          parentId: '455679873340407808',
          homeworkExamId: '455679872958726144',
        },
        {
          id: '455744442263928832',
          classId: '11',
          type: 11,
          subType: null,
          optionCount: 0,
          explainFlag: null,
          explainAudioId: null,
          explainAudioDuration: null,
          explainImageId: null,
          explainAudioUrl: null,
          explainImageUrl: null,
          explainThumbUrl: null,
          failReason: 0,
          explainContent: null,
          content: '{"blocks":[{"key":"8r32j","text":"主观","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          materialContent: null,
          answerContent: null,
          classMatesAnswers: [],
          category: 1,
          title: null,
          difficultyLevel: 0,
          name: 'test img upload error bug',
          publishTime: '2018-06-11T14:45:42+08:00',
          homeworkId: null,
          examId: null,
          parentId: '455744442251345920',
          homeworkExamId: '455744441932578816',
        },
        {
          id: '455748672576028672',
          classId: '11',
          type: 1,
          subType: null,
          optionCount: 4,
          explainFlag: null,
          explainAudioId: null,
          explainAudioDuration: null,
          explainImageId: null,
          explainAudioUrl: null,
          explainImageUrl: null,
          explainThumbUrl: null,
          failReason: 0,
          explainContent: null,
          content: '{"blocks":[{"key":"5ck7o","text":"大多数A","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          materialContent: null,
          answerContent: null,
          classMatesAnswers: [],
          category: 1,
          title: null,
          difficultyLevel: 0,
          name: '材料',
          publishTime: '2018-06-11T15:02:31+08:00',
          homeworkId: null,
          examId: null,
          parentId: '455748672567640064',
          homeworkExamId: '455748672261455872',
        }],
    };
  }

  // 点击头部隐藏更多筛选层
  onTopClickFun = () => {
    const { showExtendView } = this.state;
    if (showExtendView) {
      this.setVisibleFun(false);
    }
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

  // 渲染需要展示在扩展列表视图中的组件
  renderFilterView = () => (
    <View style={styles.renderFilterView}>
      <Text style={{ fontSize: 30, color: '#f00' }}>更多筛选内容</Text>
    </View>
  )


  render() {
    const {
      showExtendView, problemData, currentSubjectId, subjectData,
    } = this.state;
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
        <ProblemList problemData={problemData} />
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
