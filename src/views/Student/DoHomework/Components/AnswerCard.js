import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './AnswerCard.scss';

class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { answers } = this.props;
    return (
      <View style={styles.answerCard_container}>
        <View style={styles.answer_content}>
          <Text style={styles.answer_content_txt}>{answers}</Text>
        </View>
      </View>
    );
  }
}

AnswerCard.propTypes = {
  answers: PropTypes.string.isRequired,
  mistakeReform: PropTypes.bool, // 错题重做页面调用时用来标识调用方的
};

export default AnswerCard;
