// 错题重做页面
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swiper from 'react-native-swiper';
import HTMLView from 'react-native-htmlview';
import draftToHtml from '../../../utils/draftjsToHtml';
import Modal, { ModalApi } from '../../../components/Modal';
import ThumbnailImage from '../../../components/ThumbnailImage';
import { getQuestionTypeName } from '../../../utils/common';
// import QuestionCard from '../DoHomework/Components/QuestionCard';
import I18nText from '../../../components/I18nText';
import * as actions from '../../../actions/mistakeReformAction';
import CIcon from '../../../components/Icon';
import AnswerCard from '../DoHomework/Components/AnswerCard';
import WrongReason from '../../../components/WrongReason';
import styles from './MistakeReform.scss';
import NotResult from '../../../components/NotResult';
// import problemImg from '../../../public/img/problem.png';

class MistakeReform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    const {
      actions: {
        saveQuestionsAction,
      },
      // isRandom,
      problemCardInfo,
    } = props;
    // console.warn(39, problemCardInfo, isRandom);
    // 发送action保存到redux中，且在saga保存的时候加入一些页面需要的逻辑
    saveQuestionsAction(problemCardInfo);
  }

  componentDidMount() {
    console.log('调用 错题重做 MistakeReform 组件', this.props);
  }

  // 富文本数据展示框
  htmlViewComponent=(htmlContent) => {
    console.log(draftToHtml(JSON.parse(htmlContent)));
    const htmlViewStyles = StyleSheet.create({
      p: {
        fontSize: 24,
        color: '#999999',
      },
    });
    // const htmlContent = '<p>zhazhazha</p>'
    // + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    // + 'alt="undefined" style="float:none;height: auto;width: auto"/>'
    // + '<p>曹尼玛的富文本</p>';
    return (
      <View style={styles.htmlViewComponent}>
        <HTMLView
          value={draftToHtml(JSON.parse(htmlContent))}
          stylesheet={htmlViewStyles}
        />
      </View>
    );
  }

  // 导航条右侧是否有 index
  haveIndex = (index) => {
    const { questions } = this.props;
    if (questions.length > 1) {
      return (
        <View style={styles.head_index_view}>
          <Text style={styles.head_index_text}>{`${index + 1}/${questions.length}`}</Text>
        </View>
      );
    }
    return null;
  }

  // 点击题目
  handleToClickRadio = (id, value, item) => {
    console.log(value);
    const { actions: { selectAnswerAction, saveObjectiveAnswerAction } } = this.props;
    const { index } = this.state;
    // 客观题要保存答案
    const { type } = item;
    if (type === 1 || type === 2 || type === 3 || type === 4) {
      saveObjectiveAnswerAction({
        index,
        value,
      });
    }
    selectAnswerAction({
      index,
    });
  }

  // 显示提交答案的按钮
  showSubmitBtn = ({ item, index }) => {
    const {
      actions: {
        submitAnswerAction,
      },
    } = this.props;
    const { showSubmitBtn } = item.controlComponent;
    if (showSubmitBtn) {
      return (
        <View style={styles.submit_container}>
          <TouchableOpacity
            onPress={() => submitAnswerAction({ index, item }, 'REQUEST')}
          >
            <View style={styles.submit_wrap}>
              <I18nText style={styles.submit_word}>
              MistakeReform.submit
              </I18nText>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  // 显示提交正确答案信息
  showCorrectInfo = (item) => {
    const { result, showAll, showAnswer } = item.controlComponent.showCorrectInfo;
    if (showAll) {
      return (
        <View style={styles.submit_container}>
          <View style={styles.result_word}>
            {
              showAnswer ? (
                <View style={styles.result_word_child}>
                  <Text style={[styles.result_icon, styles.result_icon_right]}>
                    <CIcon name="dui" size={20} color="white" />
                  </Text>
                  <Text style={[styles.result_answer, styles.result_right]}>
                    {`回答正确，答案是${result.rightAnswer}`}
                  </Text>
                </View>
              ) : null
            }
            <View style={styles.result_word_child}>
              <Text style={[styles.result_difficult]}>
                  你可以将回答正确的题目
                {/* <TouchableOpacity
                    onPress={() => {
                      console.log('移除错题本!');
                    }}
                  > */}
                <Text
                  style={[styles.result_difficult, styles.result_right]}
                  onPress={() => {
                    this.showConfirmModal(item);
                  }}
                >
                      移除错题本
                </Text>
                {/* </TouchableOpacity> */}
                  哦！
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  leftFn = () => {
    ModalApi.onClose();
  }

  rightFn = (item) => {
    const { actions: { correctConfirmAction } } = this.props;
    const { index } = this.state;
    this.showLoading();
    correctConfirmAction({ index, callback: this.pressT, item }, 'REQUEST');
  }

  // 自动关闭tips
  pressT = () => {
    const { isRandom, currentSubjectId } = this.props;
    const data = {
      tipsContent: this.modalContent('错题已移除错题本！'),
      bottomTips: '自动关闭',
    };
    ModalApi.onOppen('TipsModal', data);
    if (!isRandom) {
      // console.warn('进来了！');
      Actions.ProblemListOverview({ subjectId: currentSubjectId });
    }
  }

  // 确认按钮后触发的 tips (打酱油的)
  showLoading = () => {
    const data = {
      // tipsContent: this.svgContent(),
      svgName: 'finger',
      animationType: 'loading',
      bottomTips: '正在加载...',
      maskClosable: false,
    };
    ModalApi.onOppen('AnimationsModal', data);
  }

  modalContent = tip => (
    <View style={styles.modalContent}>
      <Text style={styles.modalContentText}>
        {tip}
      </Text>
    </View>
  )

  showConfirmModal = (item) => {
    const data = {
      lCallbakFn: this.leftFn,
      rCallbakFn: () => this.rightFn(item),
      activeBtn: 'R',
      rightBtnText: '确定',
      leftBtnText: '取消',
      content: this.modalContent('移除后将不可恢复，请确定是否移除错题本'),
      closeBtn: true,
    };
    ModalApi.onOppen('ButtomModal', data);
  }

  // 提交返回的错误答案信息
  showErrorInfo = (item) => {
    const { actions: { showWrongInfoRadioAction } } = this.props;
    const { index } = this.state;
    const { showAll, showWord, result } = item.controlComponent.showErrorInfo;
    if (showAll) {
      return (
        <View style={styles.submit_container}>
          <View style={styles.result_word}>
            <View style={styles.result_word_child}>
              <Text style={[styles.result_icon, styles.result_icon_wrong]}>
                <CIcon name="cuowu" size={20} color="white" />
              </Text>
              <Text style={[styles.result_answer, styles.result_wrong]}>
                {`回答错误,答案是${result.rightAnswer},你的答案是${result.studentAnswer}`}
              </Text>
            </View>
            {
                showWord ? (
                  <View style={styles.result_word_child}>
                    <Text style={[styles.result_difficult]}>
                      你可以对该题进行
                      <Text
                        style={[styles.result_difficult, styles.result_right]}
                        onPress={() => {
                          showWrongInfoRadioAction({ index, showWord: false });
                        }}
                      >
                      错误原因分析
                      </Text>
                    哦！
                    </Text>
                  </View>
                ) : null
                }
          </View>
        </View>
      );
    }
    return null;
  }

  // 错误信息的单选
  showErrorRadio = (item, index) => {
    const { showRadio } = item.controlComponent.showErrorInfo;
    const { actions: { submitRadioAction } } = this.props;
    if (showRadio) {
      return (
        <View>
          <View style={styles.space} />
          <WrongReason
            onChange={(value) => {
              submitRadioAction({ index, value, item }, 'REQUEST');
            }}
          />
        </View>
      );
    }
    return null;
  }

  // 主观题上传答案或者客观题上传解答过程答案的函数
  handlePreviewImage = (questionId, e, imgName) => {
    console.log(222, questionId, e, imgName);
    const { actions: { updateImageAction, selectAnswerAction } } = this.props;
    const { index } = this.state;
    updateImageAction({ index, urlSource: { questionId, file: e, imgName } });
    selectAnswerAction({ index });
  }

  // 删除图片
  deleteImg = (questionId) => {
    // console.log('删除图片的id', questionId);
    const { actions: { updateImageAction, selectAnswerAction } } = this.props;
    const { index } = this.state;
    updateImageAction({ index, urlSource: {} });
    // 删除图片后不展示 提交答案并查看结果 的按钮
    selectAnswerAction({ index, notShowSubmitBtn: true });
  }

  // 上传的图片
  showImageOrTitle = ({ item }) => {
    const {
      studentAnswer, showAll,
    } = item.controlComponent.showSubjectiveInfo;
    if (studentAnswer) {
      console.log(319, studentAnswer);
    //   if (studentAnswer) {
    //     return (
    //       <View style={styles.updateImage_container}>
    //         <View style={styles.question_title}>
    //           <I18nText style={styles.question_title_txt}>
    //         DoHomeworks.answerCard.toAnswer
    //           </I18nText>
    //         </View>
    //         <View style={styles.image_container}>
    //           <Image
    //             source={{ uri: studentAnswer }}
    //             style={{ width: '100%', height: '100%' }}
    //           />
    //         </View>
    //       </View>
    //     );
    //   }
    }
    return (
      <View>
        {/* 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题 */}
        <AnswerCard
          questions={item}
          mistakeReform
          // 是否展示删除图片的按钮图标
          showDeleteIcon={!showAll}
          handleToClickRadio={(id, value) => this.handleToClickRadio(id, value, item)}
          // updateImage={this.updateImage}
          handlePreviewImage={this.handlePreviewImage}
          deleteImg={this.deleteImg}
        />
      </View>
    );
  }

  // 上传图片的回调函数
  // updateImage = (source) => {

  // }

  // 显示主观题的题目答案、别人家的答案等
  showSubjective = ({ item, index }) => {
    const {
      showAll, teacherAnswer, otherStudentAnswer, showTrueOrFalseButton,
    } = item.controlComponent.showSubjectiveInfo;
    const { actions: { controlSubjectiveButtonAction, showWrongInfoRadioAction, showCorrectInfoAction } } = this.props;
    if (showAll) {
      return (
        <View>
          {
            (teacherAnswer || otherStudentAnswer.length > 0) && <View style={styles.space} />
          }
          <View style={styles.subjective_container}>
            <View>
              {
                  // 没有老师答案就不显示
                  teacherAnswer && (
                  // 后台可能返回null给我
                  <View style={styles.answer_wrap}>
                    <Text style={styles.answer_title}>题目答案:</Text>
                    <ThumbnailImage
                      option={{
                        url: teacherAnswer,
                      }}
                    />
                  </View>
                  )
                }
            </View>
            {
              // 没有其他同学答案就不显示
              otherStudentAnswer.length > 0 ? (
                <React.Fragment>
                  <View style={styles.dotted_line} />
                  <View>
                    <View style={styles.answer_wrap}>
                      <Text style={styles.answer_title}>看看其他同学的解答过程:</Text>
                      <View style={styles.other_student_answer}>
                        {
                        // 缩略图:thumbUrl 大图: fileUrl 名称: studentName
                      otherStudentAnswer.map((item2, i) => (
                        <View style={{ marginRight: 25 }} key={i}>
                          <ThumbnailImage
                            option={{
                              url: item2.explainImageUrl,
                              studentName: item2.studentName,
                            }}
                          />
                        </View>
                      ))
                    }
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              ) : null
            }
          </View>
          {
              showTrueOrFalseButton ? (
                <View>
                  <View style={styles.space} />
                  <View style={styles.subjective_bottom}>
                    <View style={styles.subjective_bottom_left}>
                      <Text style={styles.subjective_bottom_left_word}>看完答案，你觉得这次回答对了吗？</Text>
                    </View>
                    <View style={styles.subjective_bottom_right}>
                      <View style={styles.subjective_bottom_right_child}>
                        <TouchableOpacity
                          onPress={() => {
                            // 隐藏掉这一行
                            controlSubjectiveButtonAction({ index, showTrueOrFalseButton: false });
                            // 显示错题radio
                            showWrongInfoRadioAction({ index });
                          }}
                        >
                          <View style={styles.subjective_bottom_right_btn}>
                            <Text style={styles.subjective_bottom_right_word}>错了</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            // 隐藏掉这一行
                            controlSubjectiveButtonAction({ index, showTrueOrFalseButton: false });
                            showCorrectInfoAction({ index, showAnswer: false });
                          }}
                        >
                          <View style={styles.subjective_bottom_right_btn}>
                            <Text style={styles.subjective_bottom_right_word}>对了</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : null
            }
        </View>
      );
    }
    return null;
  }

  render() {
    const { questions, currentSubjectId } = this.props;
    const { index } = this.state;
    const contentWrapStyle = questions.length > 0 ? styles.content_wrap : styles.content_wrap_not_result;
    // const contentWrapStyle = styles.content_wrap_not_result;
    return (
      <View style={styles.mistakeReform_container}>
        <Modal />
        {/* 导航条 */}
        <View style={styles.head}>
          <View style={styles.head_icon}>
            <TouchableOpacity
              // 回去的时候要重新请求
              onPress={() => Actions.ProblemListOverview({ subjectId: currentSubjectId })}
            >
              <Entypo name="chevron-thin-left" size={40} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.head_content}>
            <I18nText style={styles.head_content_word}>
              MistakeReform.header.title
            </I18nText>
          </View>
          { this.haveIndex(index) }
        </View>
        <ScrollView>
          <View style={contentWrapStyle}>
            <Swiper
              ref={(node) => { this.swiperRef = node; }}
              loop={false}
              showsPagination={false}
              onIndexChanged={(nextIndex) => {
                console.log('onIndexChanged, nextIndex=', nextIndex);
                this.setState({
                  index: nextIndex,
                });
              }}
            >
              {
                questions.length !== 0 ? questions.map((item, i) => (
                  <View key={i}>
                    {/* 题目 */}
                    <View style={styles.questionCard_container}>
                      {/* 根据web那边写好的，这边根据item.type展示什么题型 */}
                      <View style={styles.question_title}>
                        <Text style={styles.question_title_txt}>{getQuestionTypeName(item.type)}</Text>
                      </View>
                      {/* block转换为html */}
                      <View style={styles.question_content_wrap}>
                        { this.htmlViewComponent(item.content) }
                      </View>
                    </View>
                    <View style={styles.space} />
                    {/* 主观题上传图片后的图片显示,如果有图片,就显示图片，如果没有就显示题型 */}
                    {this.showImageOrTitle({ item })}
                    {/* 答案 */}
                    <View />
                    {/* 提交按钮 */}
                    { this.showSubmitBtn({ item, index: i }) }
                    {/* 错误答案信息 */}
                    { this.showErrorInfo(item) }
                    {/* 显示主观题的题目答案、别人家的答案等 */}
                    { this.showSubjective({ item, index: i }) }
                    {/* 正确答案信息 */}
                    { this.showCorrectInfo(item) }
                    {/* 错误信息的总结(radio) */}
                    { this.showErrorRadio(item, i) }
                  </View>
                )) : (
                  <NotResult
                    tips="错题已复习完毕"
                    imgStyle={{}}
                  />
                )
            }
            </Swiper>
          </View>
        </ScrollView>
      </View>
    );
  }
}
MistakeReform.propTypes = {
  // 是否是随机题 不是随机题的话，做完后跳到错题列表页
  isRandom: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  // 错题的数据
  questions: PropTypes.array.isRequired,
  // 上游传过来的数据
  problemCardInfo: PropTypes.array,
  // 当前的subjectId
  currentSubjectId: PropTypes.string.isRequired,
};

MistakeReform.defaultProps = {
  problemCardInfo: [],
  isRandom: false,
};

const mapStateToProps = (state) => {
  const {
    questions,
  } = state.mistakeReformReducer;
  return {
    questions,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MistakeReform);
