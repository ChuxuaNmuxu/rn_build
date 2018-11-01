// 作业检查页面---只能检查已做的题目
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Toast,
} from 'antd-mobile-rn';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import R from 'ramda';
import * as actions from '../../../actions/doHomeworkAction';
import I18nText from '../../../components/I18nText';
import { CustomButton } from '../../../components/Icon';
import styles from './ReviewHomework.scss';
import QuestionCard from '../DoHomework/Components/QuestionCard';
import AnswerCard from '../DoHomework/Components/AnswerCard';
import CommitHomeworkModal from '../DoHomework/Components/Modals/CommitHomeworkModal';
import CommitSuccessAndnoRemark from '../DoHomework/Components/Modals/CommitSuccessAndnoRemark';
import CommitSuccessAndhasRemark from '../DoHomework/Components/Modals/CommitSuccessAndhasRemark';

class ReviewHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data, // 做作业页面所有题目的数据
      reviewQues: null,
      countQuesNum: 0, // 总题目数
      answeredQuesNum: 0, // 已作答题数
      notAnswerQuesNum: 0, // 未作答题数
      uploadImgQid: null, // 当前上传图片的题目id
      currentStartTime: new Date(), // 开始检查作业的时间
      commitHomeworkModalStatus: false, // 二次确认模态框的显隐
      tipStatus: false, // 提交作业成功且无互批任务的模态框显隐
      hasRemarkStatus: false, // 提交作业成功且有互批任务的模态框显隐
      imgLoading: false, // 图片上传loading状态
    };
    this.tryToUploadImg = false; // 是否上传了图片--防止componentDidUpdate一直执行出现死循环
    this.commitHomework = false; // 是否点击了二次确认的提交作业按钮
  }

  componentDidMount() {
    // 筛选出已作答的题目
    this.filterAnsweredData();
  }

  componentDidUpdate() {
    const { uploadImgSuccess, needMark } = this.props;
    // 上传图片成功后提交答案
    if (uploadImgSuccess && this.tryToUploadImg) {
      const { uploadImgQid } = this.state;
      this.fetchSaveQuestion(uploadImgQid);
      this.tryToUploadImg = false;
    }
    // 提交作业成功后是否有互批作业needMark为---0:没有互批作业, 1:有互批作业，其初始值为-1，表示还未接收到接口数据
    if (this.commitHomework && needMark >= 0) {
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
  }

  // 离开页面时保存检查时间
  componentWillUnmount() {
    this.saveCheckTime();
  }

  // 控制点击提交按钮时询问是否提交的模态显隐
  setCommitModalVisibleFun = (visible) => {
    this.setState({
      commitHomeworkModalStatus: visible,
      currentStartTime: new Date(),
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


  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    const answerList = prevState.reviewQues;
    if (!R.equals(data, prevState.data)) {
      // 根据reviewQues数据中的id去找到data.finalQuestionList中的对应id的题目来相应更新答案数据
      if (answerList && answerList.length) {
        for (let i = 0; i < answerList.length; i++) {
          for (let j = 0; j < data.finalQuestionList.length; j++) {
            if (answerList[i].id === data.finalQuestionList[j].id) {
              answerList[i] = data.finalQuestionList[j];
            }
          }
        }
      }
      // 实时更新已作答和未作答题目数
      let answeredQuesNum = 0;
      let notAnswerQuesNum = 0;
      for (let k = 0; k < data.finalQuestionList.length; k++) {
        if (data.finalQuestionList[k].answered) {
          answeredQuesNum++;
        } else {
          notAnswerQuesNum++;
        }
      }
      return {
        data,
        answeredQuesNum,
        notAnswerQuesNum,
        reviewQues: answerList,
      };
    }
    return null;
  }

  // 去批改作业
  presenttoCorrentFun = () => {
    const { data: { homeworkId } } = this.state;
    this.setRemarkModalVisibleFun(false);
    // 到批阅作业界面
    Actions.HomeworkCorrecting({ homeworkId });
  }

  // 稍后再批
  laterToCorrentFun = () => {
    this.setRemarkModalVisibleFun(false);
    Actions.HomeworkTask();
  }

  // 返回继续做题
  goDoHomework = () => {
    const { data } = this.state;
    this.saveCheckTime();
    Actions.DoHomework({ homeworkId: data.homeworkId });
  }

  // 点击提交作业
  submitHomeworkFun = () => {
    this.saveCheckTime();
    const { commitHomeworkModalStatus } = this.state;
    this.setCommitModalVisibleFun(!commitHomeworkModalStatus);
  }

  // 二次确认提交作业
  commitHomeworkFun = () => {
    this.commitHomework = true;
    this.setCommitModalVisibleFun(false);
    // 请求提交作业的接口
    const { actions: { submitHomeworkAction }, data } = this.props;
    submitHomeworkAction({ homeworkId: data.homeworkId }, 'REQUEST');
  }

  // 二次确认选择检查
  viewAnsweredQuesFun = () => {
    this.setCommitModalVisibleFun(false);
    // 此时重新筛选下已作答的数据
    this.filterAnsweredData();
  }

  // 进入检查页面时筛选已作答的数据
  filterAnsweredData = () => {
    const { data } = this.props;
    // 拿到数据后将已作答的题目筛选出来，后面都以此时筛选出的题目去展示，但是图片答案要与redux中一致才行
    const answerQuestionList = [];
    let countQuesNum = 0;
    let answeredQuesNum = 0;
    let notAnswerQuesNum = 0;
    if (data && data.finalQuestionList && data.finalQuestionList.length) {
      countQuesNum = data.finalQuestionList.length;
      for (let i = 0; i < data.finalQuestionList.length; i++) {
        if (data.finalQuestionList[i].answered) {
          answerQuestionList.push(data.finalQuestionList[i]);
          answeredQuesNum++;
        } else {
          notAnswerQuesNum++;
        }
      }
    }
    this.setState({
      countQuesNum,
      answeredQuesNum,
      notAnswerQuesNum,
      reviewQues: answerQuestionList,
    });
  }

  // 保存草稿---回到首页
  draftHomework = () => {
    this.saveCheckTime();
    Actions.HomeworkTask();
  }

  // 点击未作答热区进入做作业页面--此时做作业页面展示可查看题目序号的图标并只出现未作答的题目
  goUnAnswered = () => {
    this.saveCheckTime();
    const { notAnswerQuesNum } = this.state;
    if (notAnswerQuesNum) {
      // 未作答题目数大于0才能跳转到未作答页面
      const { data } = this.state;
      Actions.DoHomework({ homeworkId: data.homeworkId, showUnAnswerQues: true });
    } else {
      // 未作答题目数为0时继续留在检查页面，更新作业检查开始时间
      this.setState({ currentStartTime: new Date() });
      Toast.info('您已全部作答完毕，请检查后提交作业！');
    }
  }

  // 保存检查耗时
  saveCheckTime = () => {
    const { actions: { saveHomeworkCheckTimeAction }, data } = this.props;
    const { currentStartTime } = this.state;
    const reviewTime = Math.floor((new Date() - currentStartTime) / 1000);
    saveHomeworkCheckTimeAction({ homeworkId: data.homeworkId, checkTime: reviewTime }, 'REQUEST');
  }

  // 难易程度发生改变的函数
  handleDifficultLevel = (currentId, level) => {
    const { actions: { changeDifficuiltLevelAction } } = this.props;
    changeDifficuiltLevelAction({ currentId, level });
    setTimeout(() => {
      this.fetchSaveQuestion(currentId);
    }, 0);
  }

  // 客观题答案发生改变的函数
  handleToClickRadio = (questionId, answer) => {
    const { actions: { changeObjectiveAnswerAction } } = this.props;
    changeObjectiveAnswerAction({ questionId, answer });
    setTimeout(() => {
      this.fetchSaveQuestion(questionId);
    }, 0);
  }

  // 主观题上传答案或者客观题上传解答过程答案的函数
  handlePreviewImage = (questionId, e, imgName) => {
    this.tryToUploadImg = true;
    this.setState({
      uploadImgQid: questionId,
      imgLoading: true,
    }, () => {
      const { actions: { uploadImageToOssAction } } = this.props;
      uploadImageToOssAction({ questionId, file: e, imgName });
    });
  }

  // 不是很懂，请老师解答
  handleCheckboxChange = (questionId, e) => {
    const { actions: { changeNeedExplainStatusAction } } = this.props;
    const needsExplain = e ? 1 : 0;
    changeNeedExplainStatusAction({ questionId, needsExplain });
    setTimeout(() => {
      this.fetchSaveQuestion(questionId);
    }, 0);
  }

  // 删除图片答案的函数
  deleteImg = (qid) => {
    const { actions: { deleteImageUrlAnswwerAction } } = this.props;
    const { reviewQues } = this.state;
    let types;
    for (let i = 0; i < reviewQues.length; i++) {
      if (reviewQues[i].id === qid) {
        types = reviewQues[i].type;
      }
    }
    deleteImageUrlAnswwerAction({ questionId: qid, type: types });
    setTimeout(() => {
      this.fetchSaveQuestion(qid);
    }, 0);
  }

  // 保存答题数据
  fetchSaveQuestion = (id) => {
    const { data } = this.state;
    let currentQues = {};
    for (let i = 0; i < data.finalQuestionList.length; i++) {
      if (data.finalQuestionList[i].id === id) {
        currentQues = data.finalQuestionList[i];
      }
    }
    const {
      type,
      studentAnswer,
      difficultyLevel,
      answerFileId,
      // answerFileUrl,
      needsExplain,
    } = currentQues;
    const answerParam = {};
    const { homeworkId } = data;
    answerParam.questionId = id;
    answerParam.answer = type < 10 ? studentAnswer : null;
    answerParam.difficultyLevel = difficultyLevel;
    answerParam.needsExplain = needsExplain;
    // 检查作业页面修改提交答案不算入做题耗时，故timeSpent直接传0即可
    answerParam.timeSpent = 0;
    /* 需要注意的是返回的题目数据主观题图片答案保存的id为answerFileId字段，而上传答案给接口时是用fileId来保存,图片地址不需要传了 */
    answerParam.fileId = answerFileId === '0' ? '0' : answerFileId;
    // answerParam.answerFileUrl = (answerFileUrl && answerFileUrl.length) ? answerFileUrl : null;
    const { actions: { submitDoHomeworkAnswerAction } } = this.props;
    submitDoHomeworkAnswerAction({ homeworkId, id, answerParam }, 'REQUEST');
    this.setState({
      imgLoading: false,
    });
  }

  // 已作答题目数为0时展示
  renderEmptyView = () => {
    const viewHeight = parseInt(Dimensions.get('screen').height);
    return (
      <View style={[styles.noAnswer_box, { height: viewHeight }]}>
        <Text style={styles.answer_info}>暂时没有已作答的题目</Text>
      </View>
    );
  }

  render() {
    const {
      reviewQues,
      countQuesNum,
      answeredQuesNum,
      notAnswerQuesNum,
      data,
      commitHomeworkModalStatus,
      tipStatus,
      hasRemarkStatus,
      imgLoading,
    } = this.state;
    return (
      <View style={styles.reviewHomework_container}>
        <View style={styles.reviewHomework_header}>
          <CustomButton
            name="jiantou-copy-copy"
            style={styles.buttonStyle}
            onPress={this.goDoHomework}
          >
            <I18nText>
              ReviewHomework.header.continueDoHomework
            </I18nText>
          </CustomButton>
          <Text style={styles.reviewHomeworkTitle}>
            {data.title}
            <I18nText>
              ReviewHomework.header.onReview
            </I18nText>
          </Text>
          <Text />
        </View>
        <ScrollView>
          {
            !R.isEmpty(reviewQues) && reviewQues
              ? reviewQues.map((item, index) => (
                <View key={index} style={styles.ques_card}>
                  <QuestionCard questions={item} reviewHomework />
                  <AnswerCard
                    questions={item}
                    handleDifficultLevel={this.handleDifficultLevel}
                    handleToClickRadio={this.handleToClickRadio}
                    handlePreviewImage={this.handlePreviewImage}
                    handleCheckboxChange={this.handleCheckboxChange}
                    deleteImg={this.deleteImg}
                    imgLoading={imgLoading}
                  />
                </View>))
              : this.renderEmptyView()
          }
        </ScrollView>
        <View style={styles.reviewHomework_footer}>
          <View style={styles.footer_left}>
            <View style={styles.footer_left}>
              <CustomButton name="fangxingyuanjiaogouxuan" style={styles.answer_btn} />
              <I18nText style={styles.answer_info}>
                ReviewHomework.footer.isAnswered
              </I18nText>
              <TouchableOpacity>
                <Text style={styles.questionNum}>{answeredQuesNum}题</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.footer_left} onPress={this.goUnAnswered}>
              <CustomButton name="yuanjiaojuxing" style={styles.unAnswer_btn} />
              <I18nText style={styles.answer_info}>
                ReviewHomework.footer.notAnswered
              </I18nText>
              <Text style={styles.questionNum}>{notAnswerQuesNum}题</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer_right}>
            <TouchableOpacity style={[styles.btn, styles.draftBtn]} onPress={this.draftHomework}>
              <I18nText style={styles.draft_text}>
                ReviewHomework.footer.draftText
              </I18nText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.commitBtn]} onPress={this.submitHomeworkFun}>
              <I18nText style={styles.commit_text}>
                ReviewHomework.footer.commitText
              </I18nText>
            </TouchableOpacity>
          </View>
        </View>
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
      </View>
    );
  }
}

ReviewHomework.propTypes = {
  data: PropTypes.object.isRequired,
  uploadImgSuccess: PropTypes.bool.isRequired,
  needMark: PropTypes.number.isRequired, // 提交作业后是否有互批作业的标识
  actions: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewHomework);
