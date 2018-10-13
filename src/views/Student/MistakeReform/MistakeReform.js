// 错题重做页面
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swiper from 'react-native-swiper';
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
    console.log(39, problemCardInfo);
    // 发送action保存到redux中，且在saga保存的时候加入一些页面需要的逻辑
    saveQuestionsAction(problemCardInfo);
  }

  componentDidMount() {
    console.log('调用 错题重做 MistakeReform 组件', this.props);
  }

  // 导航条右侧是否有 index
  haveIndex = (index) => {
    const { questions } = this.props;
    if (questions.length > 1) {
      return (
        <View style={styles.head_index_view}>
          <Text style={styles.head_index_text}>{index + 1}/5</Text>
        </View>
      );
    }
    return null;
  }

  // 点击题目
  handleToClickRadio = (value) => {
    console.log(value);
    const { actions: { selectAnswerAction } } = this.props;
    const { index } = this.state;
    selectAnswerAction({
      value,
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
  showCorrectInfo = ({ bol }) => {
    if (bol.showAll) {
      return (
        <View style={styles.submit_container}>
          <View style={styles.result_word}>
            {
              bol.showAnswer ? (
                <View style={styles.result_word_child}>
                  <Text style={[styles.result_icon, styles.result_icon_right]}>
                    <CIcon name="dui" size={20} color="white" />
                  </Text>
                  <Text style={[styles.result_answer, styles.result_right]}>
                    回答正确，答案是A
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
                    this.showConfirmModal();
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

  rightFn = () => {
    const { actions: { correctConfirmAction } } = this.props;
    const { index } = this.state;
    this.showLoading();
    correctConfirmAction({ index, callback: this.pressT }, 'REQUEST');
  }

  // 自动关闭tips
  pressT = () => {
    const data = {
      tipsContent: this.modalContent('错题已移除错题本！'),
      bottomTips: '自动关闭',
    };
    ModalApi.onOppen('TipsModal', data);
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

  // demo的函数名乱搞的，写代码的大佬别乱copy
  showConfirmModal = () => {
    const data = {
      lCallbakFn: this.leftFn,
      rCallbakFn: this.rightFn,
      activeBtn: 'R',
      rightBtnText: '确定',
      leftBtnText: '取消',
      content: this.modalContent('移除后将不可恢复，请确定是否移除错题本'),
      closeBtn: true,
    };
    ModalApi.onOppen('ButtomModal', data);
  }

  // 提交返回的错误答案信息
  showErrorInfo = ({ bol, index }) => {
    const { actions: { showWrongInfoRadioAction } } = this.props;
    if (bol.showAll) {
      return (
        <View style={styles.submit_container}>
          <View style={styles.result_word}>
            <View style={styles.result_word_child}>
              <Text style={[styles.result_icon, styles.result_icon_wrong]}>
                <CIcon name="cuowu" size={20} color="white" />
              </Text>
              <Text style={[styles.result_answer, styles.result_wrong]}>
            回答错误,答案是B,你的答案是A
              </Text>
            </View>
            {
                bol.showWord ? (
                  <View style={styles.result_word_child}>
                    <Text style={[styles.result_difficult]}>
                      你可以对该题进行
                      <Text
                        style={[styles.result_difficult, styles.result_wrong]}
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
  showErrorRadio = ({ bol, index }) => {
    const { actions: { submitRadioAction } } = this.props;
    if (bol.showRadio) {
      return (
        <View>
          <View style={styles.space} />
          <WrongReason
            onChange={(value) => {
              submitRadioAction({ index, value }, 'REQUEST');
            }}
          />
        </View>
      );
    }
    return null;
  }

  // 上传的图片
  showImage = ({ item, index }) => {
    const {
      showSubjectiveInfo: {
        urlSource,
      },
    } = item.controlComponent;
    if (urlSource) {
      const {
        uri = null,
        // width = null,
        // height = null,
      } = urlSource;
      if (uri && uri.length > 0) {
        return (
          <View style={styles.updateImage_container}>
            <View style={styles.question_title}>
              <I18nText style={styles.question_title_txt}>
            DoHomeworks.answerCard.toAnswer
              </I18nText>
            </View>
            <View style={styles.image_container}>
              <Image
                source={{ uri }}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          </View>
        );
      }
    }
    return (
      <View>
        {/* 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题 */}
        <AnswerCard
          questions={item}
          mistakeReform
          handleToClickRadio={this.handleToClickRadio}
          updateImage={this.updateImage}
        />
      </View>
    );
  }

  // 上传图片的回调函数
  updateImage = (source) => {
    const { actions: { updateImageAction, selectAnswerAction } } = this.props;
    const { index } = this.state;
    updateImageAction({ index, urlSource: source });
    selectAnswerAction({ index });
  }

  // 显示主观题的题目答案、别人家的答案等
  showSubjective = ({ item, index }) => {
    const {
      showAll, teacherAnswer, otherStudentAnswer, showTrueOrFalseButton,
    } = item.controlComponent.showSubjectiveInfo;
    const { actions: { controlSubjectiveButtonAction, showWrongInfoRadioAction, showCorrectInfoAction } } = this.props;
    if (showAll) {
      return (
        <View>
          <View style={styles.space} />
          <View style={styles.subjective_container}>
            <View>
              <View style={styles.answer_wrap}>
                <Text style={styles.answer_title}>题目答案:</Text>
                <ThumbnailImage
                  option={{
                    url: teacherAnswer,
                  }}
                />
              </View>
            </View>
            <View style={styles.dotted_line} />
            <View>
              <View style={styles.answer_wrap}>
                <Text style={styles.answer_title}>看看其他同学的解答过程:</Text>
                <View style={styles.other_student_answer}>
                  {
                  otherStudentAnswer.map((item2, i) => (
                    <View style={{ marginRight: 25 }} key={i}>
                      <ThumbnailImage
                        option={{
                          url: item2,
                        }}
                      />
                    </View>
                  ))
                }
                </View>
              </View>
            </View>
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
              ) : null
            }
        </View>
      );
    }
    return null;
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    return (
      <View style={styles.mistakeReform_container}>
        <Modal />
        {/* 导航条 */}
        <View style={styles.head}>
          <View style={styles.head_icon}>
            <TouchableOpacity
              onPress={Actions.pop}
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
          <View style={styles.content_wrap}>
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
                questions.map((item, i) => (
                  <View key={i}>
                    {/* 题目 */}
                    <View style={styles.questionCard_container}>
                      <View style={styles.question_title}>
                        <Text style={styles.question_title_txt}>{getQuestionTypeName(1)}</Text>
                      </View>
                      <View style={styles.question_content_wrap}>
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={{ uri: item.url }}
                        />
                      </View>
                    </View>
                    <View style={styles.space} />
                    {/* 主观题上传图片后的图片显示,如果有图片,就显示图片，如果没有就显示题型 */}
                    {this.showImage({ item, index })}
                    {/* 答案 */}
                    <View />
                    {/* 提交按钮 */}
                    { this.showSubmitBtn({ item, index: i }) }
                    {/* 错误答案信息 */}
                    { this.showErrorInfo({ bol: item.controlComponent.showErrorInfo, index: i }) }
                    {/* 显示主观题的题目答案、别人家的答案等 */}
                    { this.showSubjective({ item, index: i }) }
                    {/* 正确答案信息 */}
                    { this.showCorrectInfo({ bol: item.controlComponent.showCorrectInfo, index: i }) }
                    {/* 错误信息的总结(radio) */}
                    { this.showErrorRadio({ bol: item.controlComponent.showErrorInfo, index: i }) }
                  </View>
                ))
            }
            </Swiper>
          </View>
        </ScrollView>
      </View>
    );
  }
}
MistakeReform.propTypes = {
  // 是否是随机题
  // isRandom: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  // 错题的数据
  questions: PropTypes.array.isRequired,
  // 上游传过来的数据
  problemCardInfo: PropTypes.array.isRequired,
};

// MistakeReform.defaultProps = {
//   isRandom: false,
// };

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
