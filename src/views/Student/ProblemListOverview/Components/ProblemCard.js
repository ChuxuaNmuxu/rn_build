import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import styles from './ProblemCard.scss';
import {
  formatTimeToshow, getQuestionTypeName, convertToDifficultyLevel, failReason,
} from '../../../../utils/common/common';
import I18nText from '../../../../components/I18nText';

class ProblemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // 点击错题卡片进入错题详情页
  goProblemDetail = (category, index) => {
    const { id } = this.props;
    // console.log(23, id);
    Actions.HomeworkProblemDetail({
      id,
      category,
      index,
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
    const { datas, index } = this.props;
    console.log(35, datas);
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
          onPress={() => this.goProblemDetail(datas.category, index)}
        >
          <View style={styles.problemCard}>
            <View style={styles.question_header}>
              <Text style={styles.title_order}>
                第{ index + 1 }题
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
                    {failReason[datas.failReason]}
                  </Text>
                </View>
              </View>
              <View style={styles.footer_right}>
                <Text style={styles.question_time}>{formatTimeToshow(datas.publishTime)}</Text>
                <Text style={styles.err_reason}>
                  <I18nText>
                    ProblemListOverview.ProblemCard.form
                  </I18nText>
                  {datas.name}
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
