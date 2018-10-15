// 作业检查页面---只能检查已做的题目
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import R from 'ramda';
import moment from 'moment';
import * as actions from '../../../actions/doHomeworkAction';
import I18nText from '../../../components/I18nText';
import { CustomButton } from '../../../components/Icon';
import styles from './ReviewHomework.scss';
import QuestionCard from '../DoHomework/Components/QuestionCard';
import AnswerCard from '../DoHomework/Components/AnswerCard';

class ReviewHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data, // 做作业页面所有题目的数据
      reviewQues: null,
      answeredNum: 0, // 已作答题数
      unAnsweredNum: 0, // 未作答题数
      uploadImgQid: null, // 当前上传图片的题目id
      currentStartTime: moment(new Date()).format(), // 当前题目的开始时间
      reviewTime: 0, // 检查时间
    };
    this.timeSetInterval = null;
  }
  
  // 进入此页面时开始计时，离开此页面时将时间传给后台大佬用于保存检查时间
  componentDidMount() {
    const { data } = this.props;
    // 拿到数据后将已作答的题目筛选出来
    const answerQuestionList = [];
    let { answeredNum, unAnsweredNum } = this.state;
    if (data && data.finalQuestionList && data.finalQuestionList.length) {
      for (let i = 0; i < data.finalQuestionList.length; i++) {
        if (data.finalQuestionList[i].answered) {
          answerQuestionList.push(data.finalQuestionList[i]);
          answeredNum++;
        } else {
          unAnsweredNum++;
        }
      }
    }
    this.setState({
      answeredNum,
      unAnsweredNum,
      reviewQues: answerQuestionList,
    });
    // 进入页面后开始计时
    this.timeSetInterval = setInterval(() => {
      const { reviewTime } = this.state;
      this.setState({
        reviewTime: reviewTime + 1,
      });
    }, 1000);
  }

  componentDidUpdate() {
    const { uploadImgSuccess } = this.props;
    // 上传图片成功后提交答案
    if (uploadImgSuccess) {
      const { uploadImgQid } = this.state;
      this.fetchSaveQuestion(uploadImgQid);
    }
  }

  // 离开页面时清除计时器
  componentWillUnmount() {
    // 保存检查时间
    this.saveCheckTime();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!R.equals(data, prevState.data)) {
      return {
        data,
      };
    }
    return null;
  }

  // 返回继续做题
  goDoHomework = () => {
    const { data } = this.state;
    this.saveCheckTime();
    Actions.DoHomework({ homeworkId: data.homeworkId });
  }

  // 提交作业---回到首页
  commitHomework = () => {
    this.saveCheckTime();
    // 请求提交作业的接口
    const { actions: { submitHomeworkAction }, data } = this.props;
    submitHomeworkAction({ homeworkId: data.homeworkId }, 'REQUEST');
    Actions.HomeworkTask();
  }

  // 保存草稿---回到首页
  draftHomework = () => {
    this.saveCheckTime();
    Actions.HomeworkTask();
  }

  // 点击未作答热区进入做作业页面--此时做作业页面展示可查看题目序号的图标并只出现未作答的题目
  goUnAnswered = () => {
    this.saveCheckTime();
    const { data } = this.state;
    Actions.DoHomework({ homeworkId: data.homeworkId, showUnAnswerQues: true });
  }

  // 保存检查耗时
  saveCheckTime = () => {
    const { actions: { saveHomeworkCheckTimeAction }, data } = this.props;
    const { reviewTime } = this.state;
    saveHomeworkCheckTimeAction({ homeworkId: data.homeworkId, checkTime: reviewTime }, 'REQUEST');
    global.clearInterval(this.timeSetInterval);
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
    const { actions: { uploadImageToOssAction } } = this.props;
    uploadImageToOssAction({ questionId, file: e, imgName });
    this.setState({
      uploadImgQid: questionId,
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
      if (reviewQues.id === qid) {
        types = reviewQues.type;
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
      answerFileUrl,
      needsExplain,
    } = currentQues;
    const answerParam = {};
    const { currentStartTime } = this.state;
    const { homeworkId } = data;
    answerParam.answer = type < 10 ? studentAnswer : null;
    answerParam.difficultyLevel = difficultyLevel;
    answerParam.needsExplain = needsExplain;
    answerParam.startDate = currentStartTime;
    answerParam.endDate = moment(new Date()).format();
    /* 需要注意的是返回的题目数据主观题图片答案保存的id为answerFileId字段，而上传答案给接口时是用fileId来保存 */
    answerParam.fileId = answerFileId === '0' ? '0' : answerFileId;
    answerParam.answerFileUrl = (answerFileUrl && answerFileUrl.length) ? answerFileUrl : null;
    const { actions: { submitDoHomeworkAnswerAction } } = this.props;
    submitDoHomeworkAnswerAction({ homeworkId, id, answerParam }, 'REQUEST');
  }

  render() {
    const { reviewQues, answeredNum, unAnsweredNum, data } = this.state;
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
            reviewQues && reviewQues.map((item, index) => (
              <View key={index} style={styles.ques_card}>
                <QuestionCard questions={item} reviewHomework />
                <AnswerCard
                  questions={item}
                  handleDifficultLevel={this.handleDifficultLevel}
                  handleToClickRadio={this.handleToClickRadio}
                  handlePreviewImage={this.handlePreviewImage}
                  handleCheckboxChange={this.handleCheckboxChange}
                  deleteImg={this.deleteImg}
                  // showLoadingFun={this.showLoadingFun}
                />
              </View>
            ))
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
                <Text style={styles.questionNum}>{answeredNum}题</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.footer_left} onPress={this.goUnAnswered}>
              <CustomButton name="yuanjiaojuxing" style={styles.unAnswer_btn} />
              <I18nText style={styles.answer_info}>
                ReviewHomework.footer.notAnswered
              </I18nText>
              <Text style={styles.questionNum}>{unAnsweredNum}题</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer_right}>
            <TouchableOpacity style={[styles.btn, styles.draftBtn]} onPress={this.draftHomework}>
              <I18nText style={styles.draft_text}>
                ReviewHomework.footer.draftText
              </I18nText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.commitBtn]} onPress={this.commitHomework}>
              <I18nText style={styles.commit_text}>
                ReviewHomework.footer.commitText
              </I18nText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

ReviewHomework.propTypes = {
  data: PropTypes.object.isRequired,
  uploadImgSuccess: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { data, uploadImgSuccess } = state.doHomeworkReducer;
  return {
    data,
    uploadImgSuccess,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewHomework);
