import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import R from 'ramda';
// import moment from 'moment';
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
import { ModalApi } from '../../../components/Modal';

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
      preveId: null, // 滑动切换题目前的题目id
      currentIndex: 0, // 当前题目index
      checkStatus: 0, // 做作业右上角展示的按钮：0：作业还未选择是否想检查，1--查看已答题目，2--提交
      homeworkData: props.data || {}, // 本份作业的数据
      unAnswerQuesList: null, // 未作答的题目集合
      currentStartTime: new Date(), // 当前题目的开始时间
      uploadImgQuesId: null, // 上传图片要保存答案的题目id
    };
    this.commitHomework = false; // 是否点击了提交作业按钮
    this.fetchHomeworkStatus = false; // 刚进入页面时是否请求到作业数据
    this.switchQuesGuidData = { // 切换上下题手势指引的内容
      svgName: 'hand-up',
      animationType: 'slideInLeft',
      bottomTips: '左右滑动，切换上下题',
      maskClosable: true,
    };
    this.loadingData = {
      animationType: 'loading',
      bottomTips: '正在加载...',
      maskClosable: false,
    };
  }


  componentDidMount() {
    // 请求做作业的题目数据
    const { actions: { fetchdoHomeworkAction }, homeworkId, showUnAnswerQues } = this.props;
    // console.log('当前这份作业id', homeworkId, showUnAnswerQues);
    fetchdoHomeworkAction({ homeworkId }, 'REQUEST');
    // 判断是否只需要展示未作答的题目，如果是，此时redux中一定有题目数据，直接取出放入unAnswerQuesList中，后续不要更新
    if (showUnAnswerQues) {
      const unAnswerQuesList = [];
      const { data: { finalQuestionList } } = this.props;
      for (let i = 0; i < finalQuestionList.length; i++) {
        if (!finalQuestionList[i].answered) {
          unAnswerQuesList.push(finalQuestionList[i]);
        }
      }
      this.setState({
        unAnswerQuesList,
      });
    }
  }

  componentDidUpdate() {
    const { uploadImgSuccess, needMark } = this.props;
    const { uploadImgQuesId, homeworkData } = this.state;
    // 上传图片成功后提交答案
    console.log('didUpdate111111');
    if (uploadImgSuccess && uploadImgQuesId) {
      this.fetchSaveQuestion(uploadImgQuesId);
    }
    // 提交作业成功后是否有互批作业
    if (this.commitHomework) {
      if (needMark) {
        this.setRemarkModalVisibleFun(true);
      } else {
        // 没有互批作业2秒后跳到首页
        this.setTipModalVisibleFun(true);
        setTimeout(() => {
          Actions.HomeworkTask();
        }, 2000);
      }

      this.commitHomework = false;
    }
    // 在页面请求到作业数据后在此判断是否要展示 是否想检查 的模态框
    if (!this.fetchHomeworkStatus && !R.isEmpty(homeworkData)) {
      this.fetchHomeworkStatus = true;
      // checkStatus---0：作业还未选择是否想检查，1--查看已答题目，2--提交
      const { checkStatus } = homeworkData;
      if (!checkStatus) {
        // 未标记是否想检查作业--弹框提示
        this.setCheckModalVisibleFun(true);
      }
      this.setBtnText(checkStatus);
    }
  }

  // 点击做作业头部时隐藏扩列表视图层
  onTopClickFun = () => {
    const { showExtendView } = this.state;
    if (showExtendView) {
      this.setVisibleFun(false);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    // 根据unAnswerQuesList数据中的id去找到data.finalQuestionList中的对应id的题目来相应更新答案数据
    const unAnswerList = prevState.unAnswerQuesList;
    if (!R.equals(data, prevState.data)) {
      if (unAnswerList && unAnswerList.length) {
        for (let i = 0; i < unAnswerList.length; i++) {
          for (let j = 0; j < data.finalQuestionList.length; j++) {
            if (unAnswerList[i].id === data.finalQuestionList[j].id) {
              unAnswerList[i] = data.finalQuestionList[j];
            }
          }
        }
      }
      return {
        unAnswerQuesList: unAnswerList,
        homeworkData: data,
      };
    }
    return null;
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
  setBtnText = (num) => {
    this.setState({
      checkStatus: num,
    });
  }

  // 点击该图标展示各题号的作答情况
  showQuestionOrderFun = () => {
    const { showExtendView } = this.state;
    this.setVisibleFun(!showExtendView);
  }

  // 点击提交的函数
  submitFun = () => {
    this.setVisibleFun(false);
    const { commitHomeworkModalStatus } = this.state;
    this.setCommitModalVisbleFun(!commitHomeworkModalStatus);
  }

  // 点击二次确认的模态框内的提交按钮
  commitHomeworkFun = () => {
    // 提交整份作业的操作--请求提交作业的接口
    const { actions: { submitHomeworkAction }, homeworkId } = this.props;
    submitHomeworkAction({ homeworkId }, 'REQUEST');
    this.commitHomework = true;
    this.setCommitModalVisbleFun(false);
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
    const { homeworkId } = this.props;
    // 到批阅作业界面
    Actions.HomeworkCorrecting({ homeworkId });
  }

  // 左右滑动(切换tab)页面切换题目
  changeQuestionFun = (obj) => {
    const changeIndex = obj.i;
    const { currentIndex, homeworkData: { finalQuestionList } } = this.state;
    if (currentIndex < changeIndex) {
      if (obj.i > 0 && !finalQuestionList[currentIndex].difficultyLevel) {
        this.setState({
          preveId: finalQuestionList[currentIndex].id,
          difficultModalStatus: true,
        });
      }
      this.fetchSaveQuestion(finalQuestionList[currentIndex].id, 'nextBtnClick');
    }
    this.setState({
      currentIndex: changeIndex,
    });
  }

  // 难易程度发生改变的函数
  handleDifficultLevel = (currentId, level) => {
    const { actions: { changeDifficuiltLevelAction } } = this.props;
    const { difficultModalStatus } = this.state;
    changeDifficuiltLevelAction({ currentId, level });
    setTimeout(() => {
      this.fetchSaveQuestion(currentId);
    }, 0);
    if (difficultModalStatus) {
      this.setState({
        difficultModalStatus: false,
      });
    }
  }

  // 查看未作答的题目---点击题号切换到对应题目
  orderChange = (num) => {
    // 保存答案数据
    const { currentIndex, unAnswerQuesList } = this.state;
    const clickParams = {
      questionId: unAnswerQuesList[num - 1].id,
      number: unAnswerQuesList[num - 1].number,
    };
    this.fetchSaveQuestion(unAnswerQuesList[currentIndex].id, 'orderClick', clickParams);
    // 如果当前题目未选择难易程度，则切换其他题目时要弹出难易程度的选择框让其选择
    if (!unAnswerQuesList[currentIndex].difficultyLevel) {
      this.setState({
        preveId: unAnswerQuesList[currentIndex].id,
        difficultModalStatus: true,
      });
    }
    this.setState({
      currentIndex: num - 1,
    });
    this.setVisibleFun(false);
  }

  // 首次进入做作业页面时提示是否愿意检查---想检查--展示查看已答题目按钮
  willToCheckFun = () => {
    this.setBtnText(1);
    this.toCheckHomeworkFun(1);
    this.setCheckModalVisibleFun(false);
    // 此时表示是第一次进入该份作业，在关闭 检查意愿模态框后展示 切换上下题的手势指引
    ModalApi.onOppen('AnimationsModal', this.switchQuesGuidData);
  }

  // 不想检查--展示提交按钮
  notToCheckFun = () => {
    this.setBtnText(2);
    this.toCheckHomeworkFun(2);
    this.setCheckModalVisibleFun(false);
    // 此时表示是第一次进入该份作业，在关闭 检查意愿模态框后展示 切换上下题的手势指引
    ModalApi.onOppen('AnimationsModal', this.switchQuesGuidData);
  }

  // 请求 保存检查意愿 的接口
  toCheckHomeworkFun = (checkStatus) => {
    const { actions: { checkHomeworkAction }, homeworkId } = this.props;
    checkHomeworkAction({ homeworkId, checkStatus }, 'REQUEST');
  }

  // 客观题答案发生改变的函数
  handleToClickRadio = (questionId, answer) => {
    // console.log(111, '当前题目选择的答案是', answer);
    const { actions: { changeObjectiveAnswerAction } } = this.props;
    changeObjectiveAnswerAction({ questionId, answer });
    setTimeout(() => {
      this.fetchSaveQuestion(questionId);
    }, 0);
  }

  // 不是很懂，请老师解答
  handleCheckboxChange = (questionId, e) => {
    // console.log(22222, '当前是否选择了不是很懂', e);
    const { actions: { changeNeedExplainStatusAction } } = this.props;
    const needsExplain = e ? 1 : 0;
    changeNeedExplainStatusAction({ questionId, needsExplain });
    setTimeout(() => {
      this.fetchSaveQuestion(questionId);
    }, 0);
  }

  // 保存答题数据---根据传过来的id去拿对应数据提交答案
  fetchSaveQuestion = (id, optType, clickParams) => {
    const { currentIndex, homeworkData: { finalQuestionList } } = this.state;
    // 拿到当前要保存题目答案的索引
    let currentIndexs = currentIndex;
    for (let i = 0; i < finalQuestionList.length; i++) {
      if (finalQuestionList[i].id === id) {
        currentIndexs = i;
      }
    }
    const {
      type,
      studentAnswer,
      difficultyLevel,
      answerFileId,
      // answerFileUrl,
      needsExplain,
    } = finalQuestionList[currentIndexs];
    const { currentStartTime } = this.state;
    const answerParam = {};
    answerParam.questionId = id;
    answerParam.answer = type < 10 ? studentAnswer : null;
    answerParam.difficultyLevel = difficultyLevel;
    answerParam.needsExplain = needsExplain;
    answerParam.timeSpent = Math.floor((new Date() - currentStartTime) / 1000);
    /* 需要注意的是返回的题目数据主观题图片答案保存的id为answerFileId字段，而上传答案给接口时是用fileId来保存,不需要传图片地址了 */
    answerParam.fileId = answerFileId === '0' ? '0' : answerFileId;
    // answerParam.answerFileUrl = (answerFileUrl && answerFileUrl.length) ? answerFileUrl : null;
    if (optType === 'nextBtnClick') {
      // 如果是左滑下一题，则将下一题的number和nextQuestionId传给接口，否则这两个字段不用传
      const nextQuestionId = finalQuestionList[currentIndexs + 1].id;
      const { number } = finalQuestionList[currentIndexs + 1];
      answerParam.number = number;
      answerParam.nextQuestionId = nextQuestionId;
    }
    if (optType === 'orderClick') {
      // 如果是查看未作答题目时点击题号进入下一道题，则要将点击的那道题的number和nextQuestionId传给接口
      answerParam.number = clickParams.number;
      answerParam.nextQuestionId = clickParams.questionId;
    }
    const { actions: { submitDoHomeworkAnswerAction }, homeworkId } = this.props;
    // console.log('homeworkId', homeworkId);
    submitDoHomeworkAnswerAction({ homeworkId, id, answerParam }, 'REQUEST');
    this.setState({ currentStartTime: new Date() });
  }

  // 主观题上传答案或者客观题上传解答过程答案的函数
  handlePreviewImage = (questionId, e, imgName) => {
    // console.log(33333, questionId, e, imgName);
    const { actions: { uploadImageToOssAction } } = this.props;
    uploadImageToOssAction({ questionId, file: e, imgName });
    // 当从检查页面点击 未作答 热区 进来此页面时上传图片答案的题目id应该从此处给提交答案那，否则保存时题目id不对
    this.setState({
      uploadImgQuesId: questionId,
    });
  }

  // 删除图片答案的函数
  deleteImg = (qid) => {
    // console.log('当前删除图片对应的题目id为：', qid);
    const { actions: { deleteImageUrlAnswwerAction } } = this.props;
    const { currentIndex, homeworkData: { finalQuestionList } } = this.state;
    deleteImageUrlAnswwerAction({ questionId: qid, type: finalQuestionList[currentIndex].type });
    setTimeout(() => {
      this.fetchSaveQuestion(qid);
    }, 0);
  }

  // 上传图片后展示正在加载的loading状态
  showLoadingFun = () => {
    // ModalApi.onOppen('AnimationsModal', this.loadingData);
  }


  // 渲染需要展示在扩展列表视图中的组件
  renderQuestionOrder = (showQuesArray, currentIndex) => {
    // 拿到当前题目的number
    const currentNum = showQuesArray[currentIndex].number;

    return (
      <View style={styles.orderContent}>
        <RadioGroup
          onChange={this.orderChange}
          style={styles.order_wrapper}
          checkedIconWrapStyle={styles.checkedIconWrapStyle}
          checkedTextStyle={styles.checkedRadioTextStyle}
        >
          {
            showQuesArray.map((item, index) => (
              <RadioButton
                value={index + 1}
                key={index}
                iconWrapStyle={[
                  styles.orderStyle,
                  (item.number === currentNum) && styles.currentOrderStyle,
                  (item.answered && item.number !== currentNum) && styles.answeredOrderStyle,
                ]}
                textStyle={[
                  styles.radioTextStyle,
                  (item.number === currentNum) && styles.currentRadioTextStyle,
                  (item.answered && item.number !== currentNum) && styles.answeredOrderTextStyle,
                ]}
              >
                {item.number}
              </RadioButton>
            ))
          }
        </RadioGroup>
      </View>
    );
  }

  // 渲染作业头部组件
  renderDohomeworkTop = (homeworkData, currentIndex, finalQuestionList) => {
    const { checkStatus } = this.state;
    const { showUnAnswerQues } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.dohomework_top}
        onPress={this.onTopClickFun}
      >
        <View style={styles.doHomeworkHeader}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.HomeworkTask} />
          <Text style={styles.doHomeworkTitle}>{homeworkData.title}</Text>
          <Timer startTime={homeworkData.userTime} />
        </View>
        <View style={styles.questionOrder}>
          <View style={styles.order_left}>
            {/* 从检查页面点击未作答题目热区回到此页面时才要展示 */}
            {showUnAnswerQues
              && <CustomButton style={styles.quanbu} name="quanbu" onPress={this.showQuestionOrderFun} />
            }
            <View>
              <Text style={styles.totalQuestion}>
                <Text style={styles.currentIndex}>{currentIndex + 1}</Text>
                /{finalQuestionList ? finalQuestionList.length : 0}
              </Text>
            </View>
          </View>
          {
            checkStatus === 2
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
    const {
      WillingToCheckModalStatus,
      commitHomeworkModalStatus,
      tipStatus, hasRemarkStatus,
      difficultModalStatus,
      showExtendView,
      currentIndex,
      homeworkData,
      preveId,
      unAnswerQuesList,
    } = this.state;
    const { showUnAnswerQues } = this.props;
    const { finalQuestionList } = homeworkData;
    // 作答题目情况,拿到题目总数，已作答题数，未作答题数
    const countQuesNum = finalQuestionList && finalQuestionList.length;
    let answeredQuesNum = 0;
    let notAnswerQuesNum = 0;
    if (finalQuestionList && finalQuestionList.length) {
      for (let i = 0; i < finalQuestionList.length; i++) {
        if (finalQuestionList[i].answered) {
          answeredQuesNum++;
        } else {
          notAnswerQuesNum++;
        }
      }
    }
    // 如果showUnAnswerQues为真就只展示未作答题目集合unAnswerQuesList，否则展示全部题目数据finalQuestionList
    const showQuesArray = showUnAnswerQues ? unAnswerQuesList : finalQuestionList;
    return (
      <View style={styles.containers}>
        {this.renderDohomeworkTop(homeworkData, currentIndex, showQuesArray)}
        {
          showQuesArray && (
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
              showQuesArray.map((item, index) => (
                <ScrollView key={index}>
                  <QuestionCard questions={item} />
                  <AnswerCard
                    questions={item}
                    handleDifficultLevel={this.handleDifficultLevel}
                    handleToClickRadio={this.handleToClickRadio}
                    handlePreviewImage={this.handlePreviewImage}
                    handleCheckboxChange={this.handleCheckboxChange}
                    deleteImg={this.deleteImg}
                    showLoadingFun={this.showLoadingFun}
                  />
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
                {this.renderQuestionOrder(showQuesArray, currentIndex)}
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
            countQuesNum={countQuesNum}
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
          difficultModalStatus && (
            <DifficultLevelModal
              handleDifficultLevel={this.handleDifficultLevel}
              questionId={preveId}
            />)
        }
      </View>
    );
  }
}

DoHomeworks.propTypes = {
  data: PropTypes.object.isRequired,
  uploadImgSuccess: PropTypes.bool.isRequired, // 上传图片并成功改变redux数据的标识
  needMark: PropTypes.number.isRequired, // 提交作业后是否有互批作业的标识
  actions: PropTypes.object.isRequired,
  homeworkId: PropTypes.string,
  showUnAnswerQues: PropTypes.bool,
};

DoHomeworks.defaultProps = {
  homeworkId: null,
  showUnAnswerQues: false, // 用来标识是否只展示未作答的题目--（1）从检查页面点击 未作答 热区过来
};

const mapStateToProps = (state) => {
  const { data, uploadImgSuccess, needMark } = state.doHomeworkReducer;
  return {
    data,
    uploadImgSuccess,
    needMark,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoHomeworks);
