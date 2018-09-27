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
import WillingToCheckModal from './Components/Modals/WillingToCheckModal';
import CommitHomeworkModal from './Components/Modals/CommitHomeworkModal';
import CommitSuccessAndnoRemark from './Components/Modals/CommitSuccessAndnoRemark';
import CommitSuccessAndhasRemark from './Components/Modals/CommitSuccessAndhasRemark';
import DifficultLevelModal from './Components/Modals/DifficultLevelModal';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
class DoHomeworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WillingToCheckModalStatus: false, // 提示是否愿意检查的modal显隐
      commitHomeworkModalStatus: false, // 二次确认模态框的显隐
      tipStatus: false, // 提交作业成功且无互批任务的模态框显隐
      hasRemarkStatus: false, // 提交作业成功且有互批任务的模态框显隐
      difficultModalStatus: false, // 滑动到下一题时是展示选择难易程度的模态层
      showExtendView: false, // 是否显示该份作业所有题目序号的扩展视图
      currentIndex: 0, // 当前题目index
      showCommitBtn: true, // 当选择想检查时展示按钮--查看已答题目，选择不想检查则展示按钮--提交
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
    // 控制刚进入做作业页面是否弹框提示
    this.setCheckModalVisibleFun(true);
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

  // 控制检查模态框的显隐
  setCheckModalVisibleFun = (visible) => {
    this.setState({
      WillingToCheckModalStatus: visible,
    });
  }

  // 控制二次确认是否提交作业的模态框显隐
  setCommitModalVisbleFun = (visible) => {
    this.setState({
      commitHomeworkModalStatus: visible,
    });
  }

  // 控制提交作业成功且无互批任务的模态框显隐
  setTipModalVisibleFun = (visible) => {
    this.setState({
      tipStatus: visible,
    });
  }

  // 控制提交作业成功且有互批任务的模态框显隐
  setRemarkModalVisibleFun = (visible) => {
    this.setState({
      hasRemarkStatus: visible,
    });
  }

  // 控制右上角展示的按钮
  setBtnText = (bool) => {
    this.setState({
      showCommitBtn: bool,
    });
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
    this.setCommitModalVisbleFun(true);
  }

  // 点击二次确认的模态框内的提交按钮
  commitHomeworkFun = () => {
    // 提交整份作业的操作
    // this.setCommitModalVisbleFun(false);
    // this.setTipModalVisibleFun(true);
    // // 2秒后关闭
    // setTimeout(() => {
    //   this.setTipModalVisibleFun(false);
    //   Actions.HomeworkTask();
    // }, 2000);
    this.setRemarkModalVisibleFun(true);
  }

  // 点击查看已答题目/检查---进入作业检查页面
  viewAnsweredQuesFun = () => {
    Actions.ReviewHomework();
    this.setCommitModalVisbleFun(false);
  }

  // 稍后再批
  laterToCorrentFun = () => {
    this.setRemarkModalVisibleFun(false);
    Actions.HomeworkTask();
  }

  // 去批改作业
  presenttoCorrentFun = () => {
    this.setRemarkModalVisibleFun(false);
    // 到批阅作业界面
  }

  // 左右滑动(切换tab)页面切换题目
  changeQuestionFun = (obj) => {
    const changeIndex = obj.i;
    if (obj.i > 0) {
      this.setState({
        difficultModalStatus: true,
      });
    }
    this.setState({
      currentIndex: changeIndex,
    });
  }

  // 难易程度发生改变的函数
  handleDifficultLevel = (level, number) => {
    console.log(999, level, number);
    this.setState({
      difficultModalStatus: false,
    });
  }

  // 查看未作答的题目---点击题号切换到对应题目
  orderChange = (num) => {
    this.setState({
      currentIndex: num - 1,
    });
    this.setVisibleFun(false);
  }

  // 首次进入做作业页面时提示是否愿意检查---想检查--展示查看已答题目按钮
  willToCheckFun = () => {
    this.setBtnText(false);
    this.setCheckModalVisibleFun(false);
  }

  // 不想检查--展示提交按钮
  notToCheckFun = () => {
    this.setBtnText(true);
    this.setCheckModalVisibleFun(false);
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
  renderDohomeworkTop = (startTime, currentIndex, questionList) => {
    const randomNum = Math.random() * 10;
    const { showCommitBtn } = this.state;
    return (
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
            {/* 从检查页面点击未作答题目热区回到此页面时才要展示 */}
            {randomNum > 5 && <CustomButton style={styles.quanbu} name="quanbu" onPress={this.showQuestionOrderFun} />}
            <View>
              <Text style={styles.totalQuestion}>
                <Text style={styles.currentIndex}>{currentIndex + 1}</Text>
                /{questionList ? questionList.length : 0}
              </Text>
            </View>
          </View>
          {
            showCommitBtn
              ? (
                <CustomButton warpStyle={styles.submitBtn} style={styles.btnText} onPress={() => this.submitFun()}>
                  <I18nText>
                    DoHomeworks.header.commit
                  </I18nText>
                </CustomButton>
              )
              : (
                <CustomButton
                  warpStyle={styles.submitBtn}
                  style={styles.btnText}
                  onPress={() => this.viewAnsweredQuesFun()}
                >
                  <I18nText>
                    DoHomeworks.header.viewAnsweredQues
                  </I18nText>
                </CustomButton>
              )
          }
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    // 用于设置扩展列表视图层距离顶部的距离
    const setTop = 168;
    const startTime = 1;
    const {
      WillingToCheckModalStatus,
      commitHomeworkModalStatus,
      tipStatus, hasRemarkStatus,
      difficultModalStatus,
      showExtendView,
      currentIndex,
    } = this.state;
    const { data } = this.props;
    const { questionList } = data;
    // 已作答题目数
    const answeredQuesNum = 9;
    const notAnswerQuesNum = 2;
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
                  <AnswerCard questions={item} handleDifficultLevel={this.handleDifficultLevel} />
                </ScrollView>
              ))
              }
          </ScrollableTabView>
          )
        }
        {/* 点击左上角小图标可查看未作答题目序号列表 */}
        {
            showExtendView && (
              <ExtendListView setTop={setTop} setVisibleFun={this.setVisibleFun}>
                {this.renderQuestionOrder(questionList, currentIndex)}
              </ExtendListView>
            )
        }
        {/* 首次进入该份作业需提示是否愿意检查作业的modal */}
        {
          WillingToCheckModalStatus
          && (
          <WillingToCheckModal
            willToCheckFun={this.willToCheckFun}
            notToCheckFun={this.notToCheckFun}
          />
          )
        }
        {/* 点击提交按钮提示检查或提交的modal,只要点击了提交按钮就要二次确认 */}
        {
          commitHomeworkModalStatus && (
          <CommitHomeworkModal
            answeredQuesNum={answeredQuesNum}
            notAnswerQuesNum={notAnswerQuesNum}
            checkAnsweredQuesFun={this.viewAnsweredQuesFun}
            commitHomeworkFun={this.commitHomeworkFun}
          />
          )
        }
        {/* 二次确认点击提交成功后--无互批任务 */}
        {
          tipStatus && <CommitSuccessAndnoRemark />
        }
        {/* 二次确认点击提交成功后--有互批任务 */}
        {
          hasRemarkStatus && (
          <CommitSuccessAndhasRemark
            laterToCorrentFun={this.laterToCorrentFun}
            presenttoCorrentFun={this.presenttoCorrentFun}
          />
          )
        }
        {/* 切换题目如果未选择难易程度则弹框提示选择 */}
        {
          difficultModalStatus && <DifficultLevelModal handleDifficultLevel={this.handleDifficultLevel} />
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
