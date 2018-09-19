// 错题重做页面
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { CustomButton } from '../../../components/Icon';
import QuestionCard from '../DoHomework/Components/QuestionCard';
import AnswerCard from '../DoHomework/Components/AnswerCard';
import I18nText from '../../../components/I18nText';
import styles from './MistakeReform.scss';

class MistakeReform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {
        content: '错题本题目内容',
        answer: '错题本答案',
      },
    };
  }

  render() {
    const { questions } = this.state;
    return (
      <View style={styles.mistakeReform_container}>
        <View style={styles.mistakeReform_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.ProblemListOverview} />
          <I18nText style={styles.mistakeReformTitle}>
            MistakeReform.header.title
          </I18nText>
          <Text />
        </View>
        <QuestionCard questions={questions} mistakeReform />
        <AnswerCard questions={questions} mistakeReform />
      </View>
    );
  }
}

export default MistakeReform;
