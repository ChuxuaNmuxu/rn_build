import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './QuestionCard.scss';
import { getQuestionTypeName } from '../../../../utils/common';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.questionCard_container}>
        <View style={styles.question_title}>
          <Text style={styles.question_title_txt}>{getQuestionTypeName(parseInt(Math.random() * 10))}</Text>
        </View>
        <View style={styles.question_content}>
          <Text style={styles.question_content_txt}>题目内容</Text>
        </View>
      </View>
    );
  }
}

export default QuestionCard;
