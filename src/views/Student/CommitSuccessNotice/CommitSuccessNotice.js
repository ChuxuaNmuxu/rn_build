// 提交作业成功的提示页面，注意：有互批作业和无互批作业展示方式不同
import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import IconSet from '../../../components/Icon';
import I18nText from '../../../components/I18nText';
import styles from './CommitSuccessNotice.scss';

class CommitSuccessNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needMark: 1, // 0:没有互批作业, 1:有互批作业
    };
  }

  componentDidMount() {

  }

  // 批改作业
  goToMark = () => {

  }

  render() {
    const { needMark } = this.state;
    return (
      <View style={styles.commitSuccessNotice_box}>
        <View style={styles.successNotices_box}>
          <IconSet
            name="gou"
            style={styles.iconStyle}
          />
          <I18nText style={styles.notice_success}>CommitSuccessNotice.notice</I18nText>
          {
            needMark
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
            <View style={styles.report_content}>
              <Text style={styles.contentTxt}>《12-22历史作业》目前(客观题)正确率是：50%，对手正确率是：30%。</Text>
              <Text style={styles.contentTxt}>恭喜你赢得本次比赛的胜利！</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// CommitSuccessNotice.propTypes = {

// };

// CommitSuccessNotice.defaultProps = {

// };

export default CommitSuccessNotice;
