import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './QuestionCard.scss';
import { getQuestionTypeName } from '../../../../utils/common';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { content } = this.props;
    return (
      <View style={styles.questionCard_container}>
        <View style={styles.question_title}>
          <Text style={styles.question_title_txt}>{getQuestionTypeName(parseInt(Math.random() * 10))}</Text>
        </View>
        <View style={styles.question_content}>
          <Text style={styles.question_content_txt}>{content}</Text>
        </View>
      </View>
    );
  }
}

QuestionCard.propTypes = {
  content: PropTypes.string.isRequired,
  mistakeReform: PropTypes.bool, // 是否为错题本调用
};

export default QuestionCard;
