import React, { Component } from 'react';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
// import { PropTypes } from 'prop-types';
import { Actions } from 'react-native-router-flux';
import styles from './DoHomeworks.scss';
import { CustomButton } from '../../../components/Icon';
import Timer from './Components/Timer';
import QuestionCard from './Components/QuestionCard';
import AnswerCard from './Components/AnswerCard';
import ExtendListView from '../../../components/ExtendListView';

class DoHomeworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtendView: false, // 是否显示该份作业所有题目序号的扩展视图
      questionList: [{
        questionNum: 1,
        id: 1,
        content: '第一题内容',
        answer: '第一题答案',
      }, {
        questionNum: 2,
        id: 2,
        content: '第二题内容',
        answer: '第二题答案',
      }, {
        questionNum: 3,
        id: 3,
        content: '第三题内容',
        answer: '第三题答案',
      }],
      currentIndex: 0, // 当前题目index
      // currentStartTime: moment(new Date()).format(),      // 当前题目的开始时间
      // currentStopTime: 0,                                 // 当前题目的结束时间
      // currentTotalTime: 0,                                // 整个homework的计时
      // cropResult: null,                                   // 裁剪之后的图片数据
      // countModal: false,                                  // 提交作业modal是否显示
      // radioAnswer: null,                                  // 单选题的答案
      // multiSelectAnswer: null,                            // 多选题的答案
      // imgFileId: null,                                    // 上传图片后返回的fileid
      // needExplainCheck: false,                            // 是否需要讲解
      // homeworkData: this.props.homeworkData,
      // imgLoading: false,                                  // 图片上传阿里云时的loading状态
      // childrenListCount: 0,                               // 当前作业所有小题的总数
      // lineToAnswer: '',                                   // 对应题答案
      // judgementAnswer: null                               // 判断题答案
    };
  }


  // 点击做作业头部时隐藏扩列表视图层
  onTopClickFun = () => {
    const { showExtendView } = this.state;
    if (showExtendView) {
      this.setVisibleFun(false);
    }
  }

  // 控制扩展列表视图的显隐
  setVisibleFun = (visible) => {
    this.setState({ showExtendView: visible });
  }

  // 点击该图标展示各题号的作答情况
  showQuestionOrderFun = () => {
    const { showExtendView } = this.state;
    this.setVisibleFun(!showExtendView);
  }

  // 点击提交的函数
  submitFun = () => {
    // console.log(111, '提交函数');
    this.setVisibleFun(false);
  }


  // 左右滑动(切换tab)页面切换题目
  changeQuestionFun = (obj) => {
    const changeIndex = obj.i;
    this.setState({
      currentIndex: changeIndex,
    });
  }

  // 渲染需要展示在扩展列表视图中的组件
  renderQuestionOrder = () => (
    <View style={styles.orderContent}>
      <Text style={{ fontSize: 30, color: '#f00' }}>题目序号列表1111</Text>
    </View>
  )

  // 渲染作业头部组件
  renderDohomeworkTop = (startTime, currentIndex, questionList) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.dohomework_top}
      onPress={this.onTopClickFun}
    >
      <View style={styles.doHomeworkHeader}>
        <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.HomeworkTask} />
        <Text style={styles.doHomeworkTitle}>作业名称</Text>
        <Timer startTime={startTime} />
      </View>
      <View style={styles.questionOrder}>
        <View style={styles.order_left}>
          <CustomButton style={styles.quanbu} name="quanbu" onPress={this.showQuestionOrderFun} />
          <View>
            <Text style={styles.totalQuestion}>
              <Text style={styles.currentIndex}>{currentIndex + 1}</Text>
              /{questionList && questionList.length}
            </Text>
          </View>
        </View>
        <CustomButton warpStyle={styles.submitBtn} style={styles.btnText} onPress={() => this.submitFun()}>
          提交
        </CustomButton>
      </View>
    </TouchableOpacity>
  )

  render() {
    // 用于设置扩展列表视图层距离顶部的距离
    const setTop = 168;
    const startTime = 1;
    const { showExtendView, currentIndex, questionList } = this.state;
    return (
      <View style={styles.containers}>
        {this.renderDohomeworkTop(startTime, currentIndex, questionList)}
        <ScrollableTabView
          tabBarPosition="overlayBottom"
          tabBarUnderlineStyle={{ backgroundColor: '#fff' }}
          tabBarBackgroundColor="#fff"
          initialPage={currentIndex}
          onChangeTab={this.changeQuestionFun}
          renderTabBar={() => <ScrollableTabBar />}
        >
          {
          questionList.map((item, index) => (
            <ScrollView key={index}>
              <QuestionCard content={item.content} />
              <AnswerCard answers={item.answer} />
            </ScrollView>
          ))
        }
        </ScrollableTabView>
        {
          showExtendView && (
          <ExtendListView setTop={setTop} setVisibleFun={this.setVisibleFun}>
            {this.renderQuestionOrder()}
          </ExtendListView>
          )
        }
      </View>
    );
  }
}

export default DoHomeworks;
