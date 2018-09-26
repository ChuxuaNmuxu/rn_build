import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './PreviewQuesCard.scss';
import { getQuestionTypeName } from '../../../../utils/common';

class PreviewQuesCard extends PureComponent {
  render() {
    const { questionData } = this.props;
    return (
      <View style={styles.preview_box}>
        <View style={styles.question_header}>
          <Text style={styles.title_order}>
            第{questionData.questionNum}题
          </Text>
          <View style={styles.title_border} />
          <Text style={styles.title_txt}>{getQuestionTypeName(parseInt(Math.random() * 10))}</Text>
        </View>
        <View style={styles.question_content}>
          <Text style={styles.content_txt}>{questionData.content}</Text>
        </View>
      </View>
    );
  }
}

PreviewQuesCard.propTypes = {
  questionData: PropTypes.object.isRequired,
};

export default PreviewQuesCard;
