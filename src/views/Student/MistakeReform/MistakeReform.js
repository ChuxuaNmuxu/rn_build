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
import { getQuestionTypeName } from '../../../utils/common';
// import QuestionCard from '../DoHomework/Components/QuestionCard';
import I18nText from '../../../components/I18nText';
import * as actions from '../../../actions/mistakeReformAction';
import CIcon from '../../../components/Icon';
import AnswerCard from '../DoHomework/Components/AnswerCard';
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
    if (questions.length > 0) {
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

  // 提交答案的按钮
  submitBtn = ({ bol, index }) => {
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

  // 提交返回的答案
  correctInfo = ({ bol, index }) => {
    if (bol) {
      return (
        <View style={styles.submit_container}>
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
                    console.log('移除错题本!');
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

  errorInfo = ({ bol, index }) => {
    if (bol) {
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
              <Text style={[styles.result_difficult]}>
              你可以对该题进行
                {/* <TouchableOpacity
                onPress={() => {
                  console.log('错误原因分析!');
                }}
              > */}
                <Text
                  style={[styles.result_difficult, styles.result_wrong]}
                  onPress={() => {
                    console.log('错误原因分析!');
                  }}
                >
                错误原因分析
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
                    { this.submitBtn({ bol: item.controlComponent.showSubmitBtn, index: i }) }
                    {/* 正确答案信息 */}
                    { this.correctInfo({ bol: item.controlComponent.showCorrectInfo, index: i }) }
                    {/* 错误答案信息 */}
                    { this.errorInfo({ bol: item.controlComponent.showErrorInfo, index: i }) }
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
