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
  }

  componentDidMount() {
    console.log('调用 错题重做 MistakeReform 组件', this.props);
    const {
      actions: {
        fetchDataAction,
      },
      isRandom,
    } = this.props;
    // 请求数据
    fetchDataAction({ isRandom }, 'REQUEST');
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
  showSubmitBtn = ({ bol, index }) => {
    const {
      actions: {
        submitAnswerAction,
      },
    } = this.props;
    if (bol) {
      return (
        <View style={styles.submit_container}>
          <TouchableOpacity
            onPress={() => submitAnswerAction({ index }, 'REQUEST')}
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
          <Modal />
          <View style={styles.result_word}>
            <View style={styles.result_word_child}>
              <Text style={[styles.result_icon, styles.result_icon_right]}>
                <CIcon name="dui" size={20} color="white" />
              </Text>
              <Text style={[styles.result_answer, styles.result_right]}>
                  回答正确，答案是A
              </Text>
            </View>
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
    const { showWrongInfoRadioAction } = this.props.actions;
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
            <View style={styles.result_word_child}>
              {
                bol.showWord ? (
                  <Text style={[styles.result_difficult]}>
                      你可以对该题进行
                    <Text
                      style={[styles.result_difficult, styles.result_wrong]}
                      onPress={() => {
                        showWrongInfoRadioAction({ index });
                      }}
                    >
                      错误原因分析
                    </Text>
                    哦！
                  </Text>
                ) : null
                }
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  // 错误信息的单选
  showErrorRadio = ({ bol, index }) => {
    const { submitRadioAction } = this.props.actions;
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

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    return (
      <View style={styles.mistakeReform_container}>
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
                    {/* 答案 */}
                    <View>
                      {/* 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题 */}
                      <AnswerCard
                        questions={item}
                        mistakeReform
                        handleToClickRadio={this.handleToClickRadio}
                      />
                    </View>
                    {/* 提交按钮 */}
                    { this.showSubmitBtn({ bol: item.controlComponent.showSubmitBtn, index: i }) }
                    {/* 正确答案信息 */}
                    { this.showCorrectInfo({ bol: item.controlComponent.showCorrectInfo, index: i }) }
                    {/* 错误答案信息 */}
                    { this.showErrorInfo({ bol: item.controlComponent.showErrorInfo, index: i }) }
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
  isRandom: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  // 错题的数据
  questions: PropTypes.array.isRequired,
};

MistakeReform.defaultProps = {
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
