// 作业预览
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import nzhcn from 'nzh/cn';
import HTMLView from 'react-native-htmlview';
import PreviewQuesCard from './Components/PreviewQuesCard';
import { handleFormattingTime } from '../../../utils/common';
import { CustomButton } from '../../../components/Icon';
import styles from './PreviewHomework.scss';
import I18nText from '../../../components/I18nText';
import * as actions from '../../../actions/previewHomeworkAction';
import draftToHtml from '../HomworkRecordDetail/lib/draftjs-to-html';

class PreviewHomework extends Component {
  timers = null;

  constructor(props) {
    super(props);
    this.state = {
      previewTime: 119, // 预览作业的时间
    };
  }


  componentDidMount() {
    // 请求页面数据
    const { actions: { fetchPreviewHomeworkAction }, homeworkId } = this.props;
    // console.log('当前预览作业id', homeworkId);
    if (homeworkId) {
      fetchPreviewHomeworkAction({ homeworkId }, 'REQUEST');
    }
    // 进入页面后开始计时，时间到了自动跳转至做作业页面
    this.timers = setInterval(() => {
      const { previewTime } = this.state;
      const newPreviewTime = previewTime - 1;
      this.setState({
        previewTime: newPreviewTime,
      }, () => {
        if (newPreviewTime <= 0) {
          this.doHomeWork();
        }
      });
    }, 1000);
  }

  // 离开页面时清除计时器
  componentWillUnmount() {
    // console.log(9999, '执行了componentWillUnmount函数。。。。。。');
    clearInterval(this.timers);
  }

  // 点击左上角箭头回到首页
  goIndex = () => {
    clearInterval(this.timers);
    Actions.replace('HomeworkTask');
  }

  // 完成预览，开始作业
  todoHomeworkFun = () => {
    this.doHomeWork();
  }

  // 跳转到做作业页面时需要请求检查该份作业状态的接口
  doHomeWork = () => {
    clearInterval(this.timers);
    const { actions: { checkHomeworkStatusAction }, homeworkId } = this.props;
    if (homeworkId) {
      checkHomeworkStatusAction({ homeworkId }, 'REQUEST');
    }
  }

  render() {
    const { previewTime } = this.state;
    const { data } = this.props;
    const { questionList } = data;
    return (
      <View style={styles.previewHomework_container}>
        <View style={styles.previewHomework_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={this.goIndex} />
          <Text style={styles.previewHomework_title}>{data && data.title}</Text>
          <Text style={styles.previewHomework_time}>
            <I18nText>
              PreviewHomework.header.countdown
            </I18nText>
            {handleFormattingTime(previewTime)}
          </Text>
        </View>
        <ScrollView>
          {
          questionList && questionList.map((items, indexs) => (
            <View key={indexs}>
              <View style={styles.title_box}>
                <Text style={styles.parents_title}>
                  {`${nzhcn.encodeS(indexs + 1)}、${items.title}`}(本大题共{items.childrenList.length}小题)
                </Text>
              </View>
              {
                items.content && (
                  <View style={styles.content_box}>
                    <HTMLView
                      value={draftToHtml(JSON.parse(items.content))}
                      stylesheet={styles}
                    />
                  </View>
                )
              }
              {
                items.childrenList.map((item, index) => <PreviewQuesCard key={index} questionData={item} />)
              }
            </View>
          ))
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

PreviewHomework.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  // 当前预览的作业id
  homeworkId: PropTypes.string,
};

PreviewHomework.defaultProps = {
  homeworkId: null,
};

const mapStateToProps = (state) => {
  const { data } = state.previewHomeworkReducer;
  return {
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewHomework);
