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
import immer from 'immer';
import { getQuestionTypeName } from '../../../utils/common';
// import QuestionCard from '../DoHomework/Components/QuestionCard';
import I18nText from '../../../components/I18nText';
import AnswerCard from '../DoHomework/Components/AnswerCard';
import styles from './MistakeReform.scss';

class MistakeReform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {
        type: 1,
        answer: null,
      },
      index: 0,
    };
  }

  componentDidMount() {
    console.log('调用 错题重做 MistakeReform 组件', this.props);
  }

  // 导航条右侧是否有 index
  haveIndex = () => {
    const { isRandom } = this.props;
    const { index } = this.state;
    if (isRandom) {
      return (
        <View style={styles.head_index_view}>
          <Text style={styles.head_index_text}>{index + 1}/5</Text>
        </View>
      );
    }
    return null;
  }

  handleToClickRadio = (value) => {
    console.log(value);
    this.setState(
      immer((draft) => {
        draft.questions.answer = value;
      }),
    );
  }

  render() {
    const { questions } = this.state;
    console.log(this.state);
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
              MistakeReform.submit
            </I18nText>
          </View>
          { this.haveIndex() }
        </View>
        <ScrollView>
          {/* 题目 */}
          <View style={styles.questionCard_container}>
            <View style={styles.question_title}>
              <Text style={styles.question_title_txt}>{getQuestionTypeName(1)}</Text>
            </View>
            <View style={styles.question_content_wrap}>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png' }}
              />
            </View>
          </View>
          <View style={styles.space} />
          {/* 答案 */}
          <View>
            {/* 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题 */}
            <AnswerCard
              questions={questions}
              mistakeReform
              handleToClickRadio={this.handleToClickRadio}
            />
          </View>
          {
            (questions.answer !== null) ? (
              <View style={styles.submit_container}>
                <View style={styles.submit_wrap}>
                  <TouchableOpacity
                    onPress={Actions.pop}
                  >
                    <I18nText style={styles.submit_word}>
                    MistakeReform.submit
                    </I18nText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          }
        </ScrollView>
      </View>
    );
  }
}
MistakeReform.propTypes = {
  // 是否是随机题
  isRandom: PropTypes.bool,
};

MistakeReform.defaultProps = {
  isRandom: false,
};


export default MistakeReform;
