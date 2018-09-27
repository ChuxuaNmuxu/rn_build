// 作业预览
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PreviewQuesCard from './Components/PreviewQuesCard';
import { handleFormattingTime } from '../../../utils/common';
import { CustomButton } from '../../../components/Icon';
import styles from './PreviewHomework.scss';
import I18nText from '../../../components/I18nText';

class PreviewHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewTime: 119, // 预览作业的时间
      questionList: [{
        questionNum: '1',
        id: '1',
        content: '第一题内容',
      }, {
        questionNum: '2',
        id: '2',
        content: '第二题内容',
      }, {
        questionNum: '3',
        id: '3',
        content: '第三题内容',
      }, {
        questionNum: '4',
        id: '4',
        content: '第四题内容',
      }, {
        questionNum: '5',
        id: '5',
        content: '第五题内容',
      }, {
        questionNum: '6',
        id: '6',
        content: '第六题内容',
      }],
    };
    this.timeSetInterval = null;
  }

  componentDidMount() {
    // 进入页面后开始计时，时间到了自动跳转至做作业页面
    this.timeSetInterval = setInterval(() => {
      const { previewTime } = this.state;
      this.setState({
        previewTime: previewTime - 1,
      }, () => {
        if (this.state.previewTime <= 0) {
          global.clearInterval(this.timeSetInterval);
          Actions.DoHomework();
        }
      });
    }, 1000);
  }

  // 离开页面时清除计时器
  componentWillUnmount() {
    global.clearInterval(this.timeSetInterval);
  }

  // 完成预览，开始作业
  todoHomeworkFun = () => {
    Actions.DoHomework();
  }

  render() {
    const { previewTime, questionList } = this.state;
    return (
      <View style={styles.previewHomework_container}>
        <View style={styles.previewHomework_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={Actions.HomeworkTask} />
          <Text style={styles.previewHomework_title}>作业名称</Text>
          <Text style={styles.previewHomework_time}>
            <I18nText>
              PreviewHomework.header.countdown
            </I18nText>
            {handleFormattingTime(previewTime)}
          </Text>
        </View>
        <ScrollView>
          {
            questionList.map((item, index) => <PreviewQuesCard key={index} questionData={item} />)
          }
        </ScrollView>
        <View style={styles.btn_container}>
          <CustomButton
            warpStyle={styles.todoHomeworkBtn}
            style={styles.btnText}
            onPress={() => this.todoHomeworkFun()}
          >
            <I18nText>
              PreviewHomework.footer.startDoHomework
            </I18nText>
          </CustomButton>
        </View>
      </View>
    );
  }
}

export default PreviewHomework;
