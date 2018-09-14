// 错题重做页面
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { CustomButton } from '../../../components/Icon';
import QuestionCard from '../DoHomework/Components/QuestionCard';
import AnswerCard from '../DoHomework/Components/AnswerCard';
import styles from './MistakeReform.scss';

class MistakeReform extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.mistakeReform_container}>
        <View style={styles.mistakeReform_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.ProblemListOverview} />
          <Text style={styles.mistakeReformTitle}>错题重做</Text>
          <Text />
        </View>
        <QuestionCard content="错题本题目内容" mistakeReform />
        <AnswerCard answers="错题本答案" mistakeReform />
      </View>
    );
  }
}

export default MistakeReform;
