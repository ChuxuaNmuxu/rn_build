import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import styles from './ProblemCard.scss';
import { formatTimeToshow, getQuestionTypeName, convertToDifficultyLevel } from '../../../../utils/common/common';

class ProblemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // 点击错题卡片进入错题详情页
  goProblemDetail = () => {
    console.log(123, '点击进入详情页');
  }

  // 点击复习错题进入错题重做页面
  doErrWorkAgain = () => {
    Actions.MistakeReform();
  }

  render() {
    const { datas } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.problemCard_box}
        onPress={this.goProblemDetail}
      >
        <SwipeRow
          disableRightSwipe
          rightOpenValue={-270}
        >
          <TouchableOpacity
            style={styles.hidenBtn}
            onPress={this.doErrWorkAgain}
          >
            <Text />
            <Text style={styles.hideText}>复习错题</Text>
          </TouchableOpacity>
          <View style={styles.problemCard}>
            <View style={styles.question_header}>
              <Text style={styles.title_order}>
                第{datas.questionNum}题
              </Text>
              <View style={styles.title_border} />
              <Text style={styles.title_txt}>{getQuestionTypeName(datas.type)}</Text>
            </View>
            <View style={styles.question_content}>
              <Text style={styles.content_txt}>{datas.content}</Text>
            </View>
            <View style={styles.question_footer}>
              <View style={styles.footer_left}>
                <View style={[styles.difficult_box, { backgroundColor: convertToDifficultyLevel(datas.difficultyLevel, true) }]}>
                  <Text style={styles.difficult_txt}>{convertToDifficultyLevel(datas.difficultyLevel)}</Text>
                </View>
                <View>
                  <Text style={styles.err_reason}>错误原因：审题不仔细</Text>
                </View>
              </View>
              <View style={styles.footer_right}>
                <Text style={styles.question_time}>{formatTimeToshow(datas.publishTime)}</Text>
                <Text style={styles.err_reason}>来自：语文第一章作业</Text>
              </View>
            </View>
          </View>
        </SwipeRow>
      </TouchableOpacity>
    );
  }
}

ProblemCard.propTypes = {
  datas: PropTypes.object.isRequired,
};

export default ProblemCard;
