import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './AnswerCard.scss';
import Radio from '../../../../components/Radio';
import { getQuestionTypeName } from '../../../../utils/common';

const RadioGroup = Radio.Group;

class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['A', 'B', 'C', 'D', 'E'],
    };
  }

  render() {
    const { questions } = this.props;
    const { options } = this.state;
    return (
      <View style={styles.answerCard_container}>
        <View style={styles.question_title}>
          <Text style={styles.question_title_txt}>{getQuestionTypeName(questions.type)}</Text>
        </View>
        <View style={styles.answer_content}>
          {questions.type === 1 && <RadioGroup options={options} childStyle={styles.radioStyle} />}
        </View>
      </View>
    );
  }
}

AnswerCard.propTypes = {
  questions: PropTypes.object.isRequired,
  mistakeReform: PropTypes.bool, // 错题重做页面调用时用来标识调用方的
};

export default AnswerCard;
