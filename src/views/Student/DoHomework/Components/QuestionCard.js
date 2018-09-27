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
    const { questions, reviewHomework } = this.props;
    return (
      <View style={styles.questionCard_container}>
        <View style={styles.question_title}>
          {
            reviewHomework
            && (
            <Text style={styles.title_order}>
              第{questions.number}题
            </Text>
            )
          }
          {reviewHomework && <View style={styles.title_border} />}
          <Text style={styles.question_title_txt}>{getQuestionTypeName(questions.type)}</Text>
        </View>
        <View style={styles.question_content}>
          <Text style={styles.question_content_txt}>{questions.content}</Text>
        </View>
      </View>
    );
  }
}


QuestionCard.defaultProps = {
  mistakeReform: false, // 错题重做页面调用时用来标识调用方的
  reviewHomework: false, // 是否为检查作业页面调用
};

QuestionCard.propTypes = {
  questions: PropTypes.object.isRequired,
  mistakeReform: PropTypes.bool, // 是否为错题本调用
  reviewHomework: PropTypes.bool, // 是否为检查作业页面调用
};

export default QuestionCard;
