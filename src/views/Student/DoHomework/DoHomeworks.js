import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
// import { PropTypes } from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18nText from '../../../components/I18nText';
import Radio from '../../../components/Radio';
import * as actions from '../../../actions/doHomeworkAction';
import styles from './DoHomeworks.scss';
import { CustomButton } from '../../../components/Icon';
import Timer from './Components/Timer';
import QuestionCard from './Components/QuestionCard';
import AnswerCard from './Components/AnswerCard';
import ExtendListView from '../../../components/ExtendListView';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
class DoHomeworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtendView: false, // 是否显示该份作业所有题目序号的扩展视图
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

  componentDidMount() {
    // 请求做作业的题目数据
    const { actions: { fetchdoHomeworkAction } } = this.props;
    fetchdoHomeworkAction(null, 'REQUEST');
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

  // 点击题号切换到对应题目
  orderChange = (num) => {
    this.setState({
      currentIndex: num - 1,
    });
    this.setVisibleFun(false);
  }

  // 渲染需要展示在扩展列表视图中的组件
  renderQuestionOrder = (questionList, currentIndex) => (
    <View style={styles.orderContent}>
      <RadioGroup
        onChange={this.orderChange}
        style={styles.order_wrapper}
        checkedIconWrapStyle={styles.checkedIconWrapStyle}
        checkedTextStyle={styles.checkedRadioTextStyle}
      >
        {
          questionList.map((item, index) => (
            <RadioButton
              value={item.number}
              key={index}
              iconWrapStyle={[styles.orderStyle, (item.number - 1) === currentIndex && styles.currentOrderStyle]}
              textStyle={[styles.radioTextStyle, (item.number - 1) === currentIndex && styles.currentRadioTextStyle]}
            >
              {item.number}
            </RadioButton>
          ))
        }
      </RadioGroup>
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
              /{questionList ? questionList.length : 0}
            </Text>
          </View>
        </View>
        <CustomButton warpStyle={styles.submitBtn} style={styles.btnText} onPress={() => this.submitFun()}>
          <I18nText>
            DoHomeworks.header.commit
          </I18nText>
        </CustomButton>
      </View>
    </TouchableOpacity>
  )

  render() {
    // 用于设置扩展列表视图层距离顶部的距离
    const setTop = 168;
    const startTime = 1;
    const { showExtendView, currentIndex } = this.state;
    const { data } = this.props;
    const { questionList } = data;
    return (
      <View style={styles.containers}>
        {this.renderDohomeworkTop(startTime, currentIndex, questionList)}
        {
          questionList && (
          <ScrollableTabView
            tabBarPosition="overlayBottom"
            tabBarUnderlineStyle={{ backgroundColor: '#fff' }}
            // tabBarBackgroundColor="#fff"
            initialPage={currentIndex} // 页面初始化展示的页面序号。默认为0
            page={currentIndex} // 动态控制当前展示的页面序号
            onChangeTab={this.changeQuestionFun}
            renderTabBar={() => <ScrollableTabBar />}
          >
            {
              questionList.map((item, index) => (
                <ScrollView key={index}>
                  <QuestionCard questions={item} />
                  <AnswerCard questions={item} />
                </ScrollView>
              ))
            }
          </ScrollableTabView>
          )
        }
        {
          showExtendView && (
          <ExtendListView setTop={setTop} setVisibleFun={this.setVisibleFun}>
            {this.renderQuestionOrder(questionList, currentIndex)}
          </ExtendListView>
          )
        }
      </View>
    );
  }
}

DoHomeworks.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { data } = state.doHomeworkReducer;
  return {
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoHomeworks);
