import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import nzhcn from 'nzh/cn';
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
        {/* 材料区 */}
        {
          questions.materialContent && !reviewHomework && (
            <View style={styles.material_container}>
              <View style={styles.question_title}>
                <Text style={styles.question_title_txt}>
                  材料
                </Text>
              </View>
              <View style={styles.question_content}>
                {
                  questions.materialContent && (
                  <View style={styles.material_box}>
                    <Text>{questions.materialContent}</Text>
                  </View>
                  )
                }
              </View>
            </View>)
        }
        {/* 题目区 */}
        <View>
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
            {!reviewHomework && (
              <Text style={styles.question_bigTitle}>
                {`${nzhcn.encodeS(questions.bigNumber)}、${questions.bigTitle}`}
              </Text>)
            }
            <Text style={styles.question_title_txt}>
              {
                !reviewHomework
                  ? (`(小题：${getQuestionTypeName(questions.type)})`)
                  : getQuestionTypeName(questions.type)
              }
            </Text>
            {
              questions.smallQuesNum && !reviewHomework
              && <Text style={styles.question_info}>当前材料第{questions.currentNum}/{questions.smallQuesNum}题</Text>
            }
          </View>
          <View style={styles.question_content}>
            <Text>{questions.content}</Text>
          </View>
        </View>
      </View>
    );
  }
}


QuestionCard.defaultProps = {
  // mistakeReform: false, // 错题重做页面调用时用来标识调用方的
  reviewHomework: false, // 是否为检查作业页面调用
};

QuestionCard.propTypes = {
  questions: PropTypes.object.isRequired,
  // mistakeReform: PropTypes.bool, // 是否为错题本调用
  reviewHomework: PropTypes.bool, // 是否为检查作业页面调用
};

export default QuestionCard;
