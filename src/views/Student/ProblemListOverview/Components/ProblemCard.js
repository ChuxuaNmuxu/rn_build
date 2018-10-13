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
import I18nText from '../../../../components/I18nText';

class ProblemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // 点击错题卡片进入错题详情页
  goProblemDetail = () => {
    const { id } = this.props;
    Actions.HomeworkProblemDetail({
      id,
    });
  }

  // 点击复习错题进入错题重做页面
  doErrWorkAgain = () => {
    const { datas } = this.props;
    // console.log(datas);
    Actions.MistakeReform({
      problemCardInfo: [datas],
    });
  }

  render() {
    const { datas } = this.props;
    return (
      <SwipeRow
        disableRightSwipe
        rightOpenValue={-270}
      >
        <TouchableOpacity
          style={styles.hidenBtn}
          onPress={this.doErrWorkAgain}
        >
          <Text />
          <I18nText style={styles.hideText}>
              ProblemListOverview.ProblemCard.reviewQuestion
          </I18nText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.problemCard_box}
          onPress={this.goProblemDetail}
        >
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
                  <Text style={styles.err_reason}>
                    <I18nText>
                      ProblemListOverview.ProblemCard.wrongReason
                    </I18nText>
                    审题不仔细
                  </Text>
                </View>
              </View>
              <View style={styles.footer_right}>
                <Text style={styles.question_time}>{formatTimeToshow(datas.publishTime)}</Text>
                <Text style={styles.err_reason}>
                  <I18nText>
                    ProblemListOverview.ProblemCard.form
                  </I18nText>
                  语文第一章作业
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SwipeRow>
    );
  }
}

ProblemCard.propTypes = {
  datas: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProblemCard;
