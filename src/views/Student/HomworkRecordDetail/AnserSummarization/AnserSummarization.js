import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  findNodeHandle,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
// import { CustomButton } from '../../../components/Icon';

import PropTypes from 'prop-types';
import Popover from 'react-native-modal-popover';
import styles from './AnserSummarization.scss';
import Svg from '../../../../components/Svg';

class AnserSummarization extends Component {
  constructor(props) {
    super(props);
    // 这样子写没什么特别之处，就是我懒得每个用到的地方都去解构
    // this.type = props.type;
    // this.isItCorrect = props.isItCorrect;
    // this.status = props.status;
    // this.difficultyDegree = props.difficultyDegree;
    // this.questionType = props.questionType;
    // this.correctAnser = props.correctAnser;
    // this.studentAnser = props.studentAnser;
    // this.score = props.score;
    this.state = {
      showPopover: false,
      popoverAnchor: {},
    };
  }

  getTextColor=(status, isItCorrect) => {
    // :#fa5656 :#30bf6c; :#f5a623; :#ffffff
    // 0 错误   1正确   2对一些   3默认
    const color = ['#fa5656', '#30bf6c', '#f5a623', '#666666'];
    // 假如未批改完，都是灰色
    if (status === 0) {
      return color[3];
    }
    // 批改完了，有颜色()
    return color[isItCorrect];
  }

  getText = (status, isItCorrect) => {
    const {
      correctAnser, studentAnser, score, questionType, isQuestionSubmited, type,
    } = this.props;
    const isH = type === 'H';
    console.log(questionType, 'getTextgetTextgetText');
    // 主观题客观题的展示效果不一样，五种状态下的展示也不一样。文档敢写详细点？
    let text = '';
    const [
      wrongtext,
      corecttext,
      unanser,
      partialCorrect,
      unCorrect,
    ] = [
      questionType === 'obj' ? `回答错误，答案是${correctAnser}，你的答案是${studentAnser}${isH ? '' : `，得分：${score}分`}` : `回答错误${isH ? '' : `，得分：${score}分`}`,
      questionType === 'obj' ? `回答正确，答案是${correctAnser}${isH ? '' : `，得分：${score}分`}` : `回答正确${isH ? '' : `，得分：${score}分`}`,
      questionType === 'obj' ? `未作答，答案是${correctAnser}` : '未作答',
      `部分正确，答案是${correctAnser}，你的答案是${studentAnser}，得分：${score}分`,
      questionType === 'obj' ? `答案是${correctAnser}，你的答案是${studentAnser}` : '解答过程',
    ];
    if (!isQuestionSubmited) {
      text = unanser;
      return text;
    }
    if (status === 0) {
      text = unCorrect;
      return text;
    }
    if (status === 1) {
      text = [wrongtext, corecttext, partialCorrect][isItCorrect];
      return text;
    }

    return text;
  }

  setButton = () => {
    const handle = findNodeHandle(this.button);
    if (handle) {
      NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
        console.log(x, y);
        this.setState({
          popoverAnchor: {
            x, y, width, height,
          },
        });
      });
    }
  };


  // 考试的
  examinationSummary=() => {
    console.log('垃圾ESlint标准');
    const { isItCorrect, status } = this.props;
    const iconArr = ['wrongIcon', 'corectIcon', 'partialCorrect'];
    return (
      <View style={[styles.AnserSummarization, { justifyContent: 'flex-start' }]}>
        {
          // icon不一定会展示,没教师或者同学修改不展示
          status === 0
            ? null
            : <Svg height="40" width="40" source={iconArr[isItCorrect]} fill="#fff" />
        }

        <Text
          style={[styles.text, { color: this.getTextColor(status, isItCorrect) }, styles.textMargin]}
        >
          {this.getText(status, isItCorrect)}
        </Text>
      </View>
    );
  }

  // 作业的
  //  humanCorrected: true, systemCorrected: true, result: 0, otherCorrected
  homeworkSummary=() => {
    console.log('垃圾ESlint标准');
    const {
      isItCorrect, status, difficultyDegree, questionType, studentMarked,
    } = this.props;
    const iconArr = ['wrongIcon', 'corectIcon', 'partialCorrect'];
    const colorArr = ['#fa5656', '#30bf6c', '#f5a623', '#999999'];
    return (
      <View style={styles.AnserSummarization}>
        <View style={styles.leftTips}>
          {
          // icon不一定会展示,没教师或者同学修改不展示
          status === 0
            ? null
            : <Svg height="40" width="40" source={iconArr[isItCorrect]} fill="#fff" />
        }

          <Text
            style={[styles.text, { color: this.getTextColor(status, isItCorrect) }, styles.textMargin]}
          >
            {this.getText(status, isItCorrect)}
          </Text>

          <View style={styles.difficultyView}>
            {/* <Text style={styles.difficultyDegree}>难易程度：</Text> */}
            <Text style={[styles.difficultyDegree, { backgroundColor: colorArr[difficultyDegree], color: '#ffffff' }]}>
              {['难', '易', '适中', '未标记'][difficultyDegree]}
            </Text>
          </View>
        </View>
        {
          // 同学批阅才会出现的
          questionType === 'sub' && studentMarked === 1 && this.popoverComponent()
        }

      </View>
    );
  }

  popoverComponent=() => {
    const { showPopover, popoverAnchor } = this.state;
    return (

      <View style={styles.studentCorect} onLayout={this.setButton}>
        <Text style={styles.studentCorectText1}>由同学批阅：</Text>

        <TouchableHighlight
          ref={(r) => { this.button = r; }}
          style={styles.button}
          onPress={this.openPopover}
          underlayColor="transparent"
        >
          <Text style={[styles.studentCorectText2]}>
          批阅有误?
          </Text>
        </TouchableHighlight>

        <Popover
          contentStyle={[styles.contentStyle, {
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowColor: 'rgba(87,163,222,0.13)',
            elevation: 4,
          }]}
          visible={showPopover}
          fromRect={popoverAnchor}
          onClose={this.closePopover}
          placement="auto"
          backgroundStyle={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0)' }}
          // arrowStyle={[{
          //   shadowOffset: { width: 0, height: 0 },
          //   shadowOpacity: 0.2,
          //   shadowRadius: 0,
          //   shadowColor: 'rgba(87,163,222,0.13)',
          //   elevation: 4,
          // }]}
        >
          <View style={styles.popoverView}>
            <View style={styles.popoverViewTips}><Text style={styles.popoverViewTipsText}>确认反馈批阅有误？</Text></View>
            <View style={styles.btnView}>
              <TouchableOpacity style={[styles.popoverBtn]} onPress={this.closePopover}>
                <Text style={[styles.popoverBtnText, { color: '#30bf6c' }]}>
                  取消
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.popoverBtn, { backgroundColor: '#30bf6c' }]} onPress={this.closePopover}>
                <Text style={[styles.popoverBtnText, { color: '#ffffff' }]}>
                  确认
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Popover>

      </View>
    );
  }

  closePopover=() => {
    this.setState({ showPopover: false });
  }

  openPopover = () => {
    this.setState({ showPopover: true });
  };

  render() {
    const { type } = this.props;
    return (
      <React.Fragment>
        {
          // 分考试和作业两种展示方式
          {
            E: this.examinationSummary,
            H: this.homeworkSummary,
          }[type]()
        }
      </React.Fragment>
    );
  }
}

AnserSummarization.propTypes = {
  type: PropTypes.string,
  isItCorrect: PropTypes.number,
  questionType: PropTypes.string,
  status: PropTypes.number,
  difficultyDegree: PropTypes.number,
  // 正确答案
  correctAnser: PropTypes.string,
  // 学生答案
  studentAnser: PropTypes.string,
  // 得分
  score: PropTypes.number,
  isQuestionSubmited: PropTypes.bool,
  studentMarked: PropTypes.number,
};

AnserSummarization.defaultProps = {
  type: 'H',
  isItCorrect: 0,
  questionType: 'sub', // obj客观  sub主观
  status: 0, // 0是未提交，1教师操作过，2是学生操作过，3是机器操作过，4是未批改
  difficultyDegree: 0, // 0难，1易，2适中
  // 正确答案
  correctAnser: '',
  // 学生答案
  studentAnser: '',
  // 得分
  score: 0,
  isQuestionSubmited: false,
  studentMarked: 0,
};

export default AnserSummarization;
