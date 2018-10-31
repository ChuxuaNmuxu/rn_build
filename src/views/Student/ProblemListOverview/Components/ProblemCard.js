import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import HTMLView from 'react-native-htmlview';
import draftToHtml from '../../../../utils/draftjsToHtml';
import styles from './ProblemCard.scss';
import {
  formatTimeToshow, getQuestionTypeName, convertToDifficultyLevel, failReason,
} from '../../../../utils/common/common';
import I18nText from '../../../../components/I18nText';
import { adaptiveRotation } from '../../../../utils/resolution';

class ProblemCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textWidth: 0, // 错题来源部分需要固定的宽度，超出部分展示省略号
      // 复习错题的按钮
      reviewQuesBtns: [
        {
          backgroundColor: '#fff',
          component: [
            <TouchableOpacity
              style={styles.hidenBtn}
              key={props.index}
              onPress={this.doErrWorkAgain}
            >
              <Text />
              <I18nText style={styles.hideText}>
                    ProblemListOverview.ProblemCard.reviewQuestion
              </I18nText>
            </TouchableOpacity>,
          ],
        },
      ],
    };
  }

  componentDidMount() {
    // console.log('调用 ProblemCard 组贱', this.props);
    this.getTextWidth();
    // 监听屏幕旋转
    Dimensions.addEventListener('change', () => {
      this.getTextWidth();
    });
  }

  // 移除监听
  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      this.getTextWidth();
    });
  }

  // 通过adaptiveRotation函数去取错题来源部分的固定宽度
  getTextWidth = () => {
    const { width } = adaptiveRotation();
    const textWidth = width - 360;
    this.setState({
      textWidth,
    });
  }

  // 富文本数据展示框
  htmlViewComponent=(htmlContent) => {
    // console.log(draftToHtml(JSON.parse(htmlContent)));
    const htmlViewStyles = StyleSheet.create({
      p: {
        fontSize: 24,
        color: '#999999',
      },
    });
    // const htmlContent = '<p>zhazhazha</p>'
    // + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    // + 'alt="undefined" style="float:none;height: auto;width: auto"/>'
    // + '<p>曹尼玛的富文本</p>';
    return (
      <View style={styles.htmlViewComponent}>
        <HTMLView
          value={draftToHtml(JSON.parse(htmlContent))}
          stylesheet={htmlViewStyles}
        />
      </View>
    );
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
    const { datas, currentSubjectId } = this.props;
    console.log('点击复习错题进入错题重做页面', datas);
    Actions.MistakeReform({
      problemCardInfo: [datas],
      currentSubjectId,
    });
  }

  render() {
    const { reviewQuesBtns, textWidth } = this.state;
    const { datas, index } = this.props;
    // console.log(123, datas);
    return (
      <Swipeout
        right={reviewQuesBtns}
        sensitivity={4}
        buttonWidth={270}
        backgroundColor="#fff"
        style={{ marginTop: 12 }}
      >
        <TouchableOpacity
          activeOpacity={1}
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
              { this.htmlViewComponent(datas.content) }
              {/* <Text style={styles.content_txt}>{datas.content}</Text> */}
            </View>
            <View style={styles.question_footer}>
              <View style={styles.footer_left}>
                {/* 考试错题不显示难易程度标签--错题类型(category---1:作业,2:考试) */}
                {
                      datas.category === 1
                      && (datas.difficultyLevel !== 0 ? (
                        <View
                          style={[
                            styles.difficult_box,
                            { backgroundColor: convertToDifficultyLevel(datas.difficultyLevel, true) },
                          ]}
                        >
                          <Text style={styles.difficult_txt}>{convertToDifficultyLevel(datas.difficultyLevel)}</Text>
                        </View>
                      ) : null)
                    }
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
                <Text style={[styles.problem_info, { width: textWidth }]} numberOfLines={1}>
                  <Text style={styles.question_time}>
                    {formatTimeToshow(datas.publishTime)}&nbsp;&nbsp;&nbsp;&nbsp;
                  </Text>
                  <Text style={styles.question_name}>
                    <I18nText style={styles.question_name}>
                      ProblemListOverview.ProblemCard.form
                    </I18nText>
                    {datas.name}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

ProblemCard.propTypes = {
  datas: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentSubjectId: PropTypes.string.isRequired,
};

export default ProblemCard;
