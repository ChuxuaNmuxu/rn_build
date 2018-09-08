import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './AnswerCard.scss';

class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.answerCard_container}>
        <View style={styles.answer_content}>
          <Text style={styles.answer_content_txt}>题目答案选择区域</Text>
        </View>
      </View>
    );
  }
}

export default AnswerCard;
