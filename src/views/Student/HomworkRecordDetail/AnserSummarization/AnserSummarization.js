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
    this.type = props.type;
    this.isItCorrect = props.isItCorrect;
    this.status = props.status;
    this.difficultyDegree = props.difficultyDegree;
    this.questionType = props.questionType;
    this.state = {
      showPopover: false,
      popoverAnchor: {},
    };
  }


  getTextColor=(status, isItCorrect) => {
    // :#fa5656 :#30bf6c; :#f5a623; :#ffffff
    // 0 错误   1正确   2对一些   3默认
    const color = ['#fa5656', '#30bf6c', '#f5a623', '#666666'];
    if ([0, 3, 4].includes(status)) {
      return color[3];
    }
    // 默认是被教师和学生操作过的()
    return color[isItCorrect];
  }

  getText = (status, isItCorrect) => {
    // 主观题客观题的展示效果不一样，五种状态下的展示也不一样。文档敢写详细点？
    let text = null;
    const [
      wrongtext,
      corecttext,
      unanser,
      partialCorrect,
      unCorrect,
    ] = [
      this.questionType === 'obj' ? `回答错误，答案是${'B'}，你的答案是${'A'}，得分：${0}分` : `回答错误，得分：${0}分`,
      this.questionType === 'obj' ? `回答正确，答案是${'B'}，得分：${5}分` : `回答正确，得分：${0}分`,
      this.questionType === 'obj' ? `未作答，答案是${'B'}` : '未作答',
      `部分正确，答案是${'ABCDEF'}，你的答案是${'FEDABC'}，得分：${3}分`,
      this.questionType === 'obj' ? `答案是${'B'}，你的答案是A` : '解答过程',
    ];
    switch (status) {
      case 0:
        text = unanser;
        break;
      case 1:
        text = [wrongtext, corecttext, partialCorrect][isItCorrect];
        break;
      case 2:
        text = [wrongtext, corecttext, partialCorrect][isItCorrect];
        break;
      case 3:
        text = unCorrect;
        break;
      default:
        text = unCorrect;
    }
    return text;
  }

  setButton = () => {
    const handle = findNodeHandle(this.button);
    if (handle) {
      NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
        console.log(width, height);
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
    const iconArr = ['wrongIcon', 'corectIcon', 'partialCorrect'];
    return (
      <View style={styles.AnserSummarization}>
        {
          // icon不一定会展示,没教师或者同学修改不展示
          [0, 3, 4].includes(this.status)
            ? null
            : <Svg height="40" width="40" source={iconArr[this.isItCorrect]} fill="#fff" />
        }

        <Text
          style={[styles.text, { color: this.getTextColor(this.status, this.isItCorrect) }, styles.textMargin]}
        >
          {this.getText(this.status, this.isItCorrect)}
        </Text>
      </View>
    );
  }

  // 作业的
  //  humanCorrected: true, systemCorrected: true, result: 0, otherCorrected
  homeworkSummary=() => {
    console.log('垃圾ESlint标准');
    const iconArr = ['wrongIcon', 'corectIcon', 'partialCorrect'];
    const colorArr = ['#fa5656', '#30bf6c', '#f5a623'];
    return (
      <View style={styles.AnserSummarization}>
        <View style={styles.leftTips}>
          {
          // icon不一定会展示,没教师或者同学修改不展示
          [0, 3, 4].includes(this.status)
            ? null
            : <Svg height="40" width="40" source={iconArr[this.isItCorrect]} fill="#fff" />
        }

          <Text
            style={[styles.text, { color: this.getTextColor(this.status, this.isItCorrect) }, styles.textMargin]}
          >
            {this.getText(this.status, this.isItCorrect)}
          </Text>

          <View style={styles.difficultyView}>
            <Text style={styles.difficultyDegree}>难易程度：</Text>
            <Text style={[styles.difficultyDegree, { color: colorArr[this.difficultyDegree] }]}>
              {['难', '易', '适中'][this.difficultyDegree]}
            </Text>
          </View>
        </View>
        {
          // 同学批阅才会出现的
          this.status === 2 && this.popoverComponent()
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
          placement="top"
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
    return (
      <React.Fragment>
        {
          // 分考试和作业两种展示方式
          {
            E: this.examinationSummary,
            H: this.homeworkSummary,
          }[this.type]()
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
};

AnserSummarization.defaultProps = {
  type: 'H',
  isItCorrect: 0,
  questionType: 'sub', // obj客观  sub主观
  status: 2, // 0是未提交，1教师操作过，2是学生操作过，3是机器操作过，4是未批改
  difficultyDegree: 0, // 0难，1易，2适中
};

export default AnserSummarization;
