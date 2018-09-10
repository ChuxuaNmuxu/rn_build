import React, { Component } from 'react';
import {
  Text, View, ScrollView,
} from 'react-native';
// import { PropTypes } from 'prop-types';
import { Actions } from 'react-native-router-flux';
import styles from './DoHomeworks.scss';
import { CustomButton } from '../../../components/Icon';
import Timer from './Components/Timer';
import QuestionCard from './Components/QuestionCard';
import AnswerCard from './Components/AnswerCard';

class DoHomeworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentIndex: 0,                                    // 当前题目index
      // currentStartTime: moment(new Date()).format(),      // 当前题目的开始时间
      // currentStopTime: 0,                                 // 当前题目的结束时间
      // currentTotalTime: 0,                                // 整个homework的计时
      // cropResult: null,                                   // 裁剪之后的图片数据
      // countModal: false,                                  // 提交作业modal是否显示
      // radioAnswer: null,                                  // 单选题的答案
      // multiSelectAnswer: null,                            // 多选题的答案
      // imgFileId: null,                                    // 上传图片后返回的fileid
      // needExplainCheck: false,                            // 是否需要讲解
      // homeworkData: this.props.homeworkData,
      // imgLoading: false,                                  // 图片上传阿里云时的loading状态
      // childrenListCount: 0,                               // 当前作业所有小题的总数
      // lineToAnswer: '',                                   // 对应题答案
      // judgementAnswer: null                               // 判断题答案
    };
  }

  // 点击提交的函数
  submitFun = () => {
    console.log(111, '提交函数');
  }

  // 点击该图标展示各题号的作答情况
  showQuestionOrderFun = () => {
    console.log(13, '点击图标啦');
  }

  render() {
    const startTime = 1;
    return (
      <View style={styles.containers}>
        <View style={styles.doHomeworkHeader}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.HomeworkTask} />
          <Text style={styles.doHomeworkTitle}>作业名称</Text>
          <Timer startTime={startTime} />
        </View>
        <View style={styles.questionOrder}>
          <View style={styles.order_left}>
            <CustomButton style={styles.quanbu} name="quanbu" onPress={this.showQuestionOrderFun} />
            <View>
              <Text style={styles.totalQuestion}>
                <Text style={styles.currentIndex}>1</Text>
                /12
              </Text>
            </View>
          </View>
          <CustomButton warpStyle={styles.submitBtn} style={styles.btnText} onPress={() => this.submitFun()}>
            提交
          </CustomButton>
        </View>
        <ScrollView style={styles.main_content}>
          <View>
            <QuestionCard />
            <AnswerCard />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DoHomeworks;
