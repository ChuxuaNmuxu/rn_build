import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
// import { PropTypes } from 'prop-types';
import styles from './doHomework.scss';
import CIcon from '../../../components/Icon';
import Timer from './Components/Timer';

class DoHomework extends Component {
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

  render() {
    const startTime = 1;
    return (
      <View style={styles.containers}>
        <View style={styles.doHomeworkHeader}>
          <View style={{ width: '20%', height: '100%' }}>
            <CIcon style={styles.icon} name="jiantou-copy-copy" onPress={() => Actions.HomeworkTask()} />
          </View>
          <View style={{ width: '60%', height: '100%' }}>
            <Text style={styles.doHomeworkTitle}>作业名称</Text>
          </View>
          <View style={{ width: '20%', height: '100%' }}>
            <Timer startTime={startTime} />
          </View>
        </View>
        <View style={styles.questionOrder}>
          <View>
            <Text style={styles.totalQuestion}>
              <Text style={styles.currentIndex}>1</Text>
              /12
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => this.submitFun()}
            >
              <Text style={styles.btnText}>
                提交
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.doHomeworkMain}>
          <Text style={styles.questionText}>做作业页面</Text>
        </View>
      </View>
    );
  }
}

export default DoHomework;
