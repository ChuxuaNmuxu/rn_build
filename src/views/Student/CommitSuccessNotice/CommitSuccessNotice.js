// 提交作业成功的提示页面，注意：有互批作业和无互批作业展示方式不同
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';
import IconSet from '../../../components/Icon';
import I18nText from '../../../components/I18nText';
import styles from './CommitSuccessNotice.scss';

class CommitSuccessNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commitSuccessData: {}, // 作业提交成功后拿到的数据
    };
  }

  componentDidMount() {
    const { commitSuccessData } = this.props;
    this.setState({
      commitSuccessData,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { commitSuccessData } = nextProps;
    if (!R.equals(commitSuccessData, prevState.commitSuccessData)) {
      return {
        commitSuccessData,
      };
    }
    return null;
  }

  // 批改作业
  goToMark = () => {
    // 需要批改的作业id
    const { commitSuccessData: { homeworkId } } = this.state;
    // 到批阅作业界面
    Actions.HomeworkCorrecting({ homeworkId });
  }

  // 战况播报的展示内容--未匹配到对手就只需要展示自己的客观题正确率
  // 基本不考虑平手的问题，因为正确率一致时如果是一对一，还得看作业时间，如果是多对多，还得看队友的结果
  // 如果比赛模式是 多人，不管是不是最后一个提交的，都展示：最终比赛结果还需再等等···
  /*
    commitSuccessData.gameResultSnapshot = { // 作业比赛结果
      gameName: '12-22历史作业', // 比赛名称
      accuracy: 0.5, // 客观题正确率
      gameType: 1, // 用户参加的比赛类型 比赛分组: 1.单人 2.双人 3.三人 10.漏选（未匹配到对手）
      groupResult: 1, // 小组比赛结果 0:没有结果 1:胜利 2:平手 3:失败
      personResult: 1, // 个人比赛结果 0没有结果（对手还未提交） 1胜利  2平手 3失败
      rivalAccuracy: 0.4, // 对手客观题正确率
    };
  */
  renderReportContent = gameResultSnapshot => (gameResultSnapshot.gameType !== 10
    ? (
      <View style={styles.report_content}>
        <Text style={styles.contentTxt}>
          {`《${gameResultSnapshot.gameName}》目前(客观题)正确率是：`}
          <Text style={styles.highlight}>{gameResultSnapshot.accuracy * 100}%</Text>
          {
            gameResultSnapshot.rivalAccuracy && (
            <Text>
            ，对手正确率是：
              <Text style={styles.highlight}>{gameResultSnapshot.rivalAccuracy * 100}%</Text>。
            </Text>
            )
          }
        </Text>
        {
          gameResultSnapshot.gameType === 1
            ? (
              <Text style={styles.contentTxt}>
                {gameResultSnapshot.personResult === 3 && '很遗憾未能战胜对手，期待你的继续努力！'}
                {gameResultSnapshot.personResult === 1 && '恭喜你赢得本次比赛的胜利！'}
                {gameResultSnapshot.personResult === 2 && '此次比赛你与对手持平，期待你的继续努力！'}
                {gameResultSnapshot.personResult === 0 && '你的对手正在准备迎战中···'}
              </Text>
            )
            : (
              <Text style={styles.contentTxt}>
                最终比赛结果还需再等等···
              </Text>
            )
        }
      </View>
    )
    : (
      <View style={styles.report_content}>
        <Text style={styles.contentTxt}>
          {`《${gameResultSnapshot.gameName}》目前(客观题)正确率是：`}
          <Text style={styles.highlight}>{gameResultSnapshot.accuracy * 100}%</Text>
        </Text>
      </View>
    ))

  render() {
    const { commitSuccessData } = this.state;
    // console.log(6666, commitSuccessData);
    return (
      <View style={styles.commitSuccessNotice_box}>
        {
          !R.isEmpty(commitSuccessData) && (
          <View>
            <View style={styles.successNotices_box}>
              <IconSet
                name="gou"
                style={styles.iconStyle}
              />
              <I18nText style={styles.notice_success}>CommitSuccessNotice.notice</I18nText>
              {
                commitSuccessData.needMark
                  ? (
                    <View style={styles.hasmark_style}>
                      <I18nText style={styles.markNotice}>CommitSuccessNotice.hasMarkNotice</I18nText>
                      <View style={styles.btn_box}>
                        <TouchableOpacity style={styles.buttons} onPress={() => Actions.HomeworkTask()}>
                          <I18nText style={styles.btnTxt}>CommitSuccessNotice.laterToMark</I18nText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttons, styles.goToMark]} onPress={this.goToMark}>
                          <I18nText style={[styles.btnTxt, styles.goToMarkTxt]}>CommitSuccessNotice.goToMark</I18nText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                  : (
                    <View style={styles.hasmark_style}>
                      <I18nText style={styles.markNotice}>CommitSuccessNotice.noMarkNotice</I18nText>
                      <TouchableOpacity style={styles.buttons} onPress={() => Actions.HomeworkTask()}>
                        <I18nText style={styles.btnTxt}>CommitSuccessNotice.returnIndex</I18nText>
                      </TouchableOpacity>
                    </View>
                  )
              }
            </View>

            {/* game---作业是否参与pk，参与pk时才展示战况播报模块 */}
            {
              commitSuccessData.game && (
              <View>
                <View style={styles.space} />
                <View style={styles.report_box}>
                  <View style={styles.report_radius}>
                    <View style={styles.report_header}>
                      <IconSet
                        name="luyin2"
                        style={styles.reportIconStyle}
                      />
                      <I18nText style={styles.reportTitle}>CommitSuccessNotice.reportTitle</I18nText>
                    </View>
                    {
                      this.renderReportContent(commitSuccessData.gameResultSnapshot)
                    }
                  </View>
                </View>
              </View>
              )
            }
          </View>
          )
        }
      </View>
    );
  }
}

CommitSuccessNotice.propTypes = {
  commitSuccessData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { commitSuccessData } = state.doHomeworkReducer;
  return {
    commitSuccessData,
  };
};

export default connect(mapStateToProps)(CommitSuccessNotice);
