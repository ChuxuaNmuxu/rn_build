// 作业检查页面---只能检查已做的题目
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/doHomeworkAction';
import I18nText from '../../../components/I18nText';
import { CustomButton } from '../../../components/Icon';
import styles from './ReviewHomework.scss';
import QuestionCard from '../DoHomework/Components/QuestionCard';
import AnswerCard from '../DoHomework/Components/AnswerCard';

class ReviewHomework extends Component {
  componentDidMount() {
    // 请求做作业的题目数据
    const { actions: { fetchdoHomeworkAction } } = this.props;
    fetchdoHomeworkAction(null, 'REQUEST');
  }

  // 提交作业---回到首页
  commitHomework = () => {
    Actions.HomeworkTask();
  }

  // 保存草稿---回到首页
  draftHomework = () => {
    Actions.HomeworkTask();
  }

  // 点击未作答热区进入做作业页面--此时做作业页面展示可查看题目序号的图标并只出现未作答的题目
  goUnAnswered = () => {
    Actions.DoHomework();
  }

  render() {
    const { data } = this.props;
    const { questionList } = data;
    return (
      <View style={styles.reviewHomework_container}>
        <View style={styles.reviewHomework_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.DoHomework}>
            <I18nText>
              ReviewHomework.header.continueDoHomework
            </I18nText>
          </CustomButton>
          <Text style={styles.reviewHomeworkTitle}>
            作业名称
            <I18nText>
              ReviewHomework.header.onReview
            </I18nText>
          </Text>
          <Text />
        </View>
        <ScrollView>
          {
            questionList && questionList.map((item, index) => (
              <View key={index} style={styles.ques_card}>
                <QuestionCard questions={item} reviewHomework />
                <AnswerCard questions={item} />
              </View>
            ))
          }
        </ScrollView>
        <View style={styles.reviewHomework_footer}>
          <View style={styles.footer_left}>
            <View style={styles.footer_left}>
              <CustomButton name="fangxingyuanjiaogouxuan" style={styles.answer_btn} />
              <I18nText style={styles.answer_info}>
                ReviewHomework.footer.isAnswered
              </I18nText>
              <TouchableOpacity>
                <Text style={styles.questionNum}>5题</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.footer_left} onPress={this.goUnAnswered}>
              <CustomButton name="yuanjiaojuxing" style={styles.unAnswer_btn} />
              <I18nText style={styles.answer_info}>
                ReviewHomework.footer.notAnswered
              </I18nText>
              <Text style={styles.questionNum}>3题</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer_right}>
            <TouchableOpacity style={[styles.btn, styles.draftBtn]} onPress={this.draftHomework}>
              <I18nText style={styles.draft_text}>
                ReviewHomework.footer.draftText
              </I18nText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.commitBtn]} onPress={this.commitHomework}>
              <I18nText style={styles.commit_text}>
                ReviewHomework.footer.commitText
              </I18nText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

ReviewHomework.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { data } = state.doHomeworkReducer;
  return {
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewHomework);
