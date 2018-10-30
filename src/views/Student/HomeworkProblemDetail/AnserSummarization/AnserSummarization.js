import React, { Component } from 'react';
import {
  View,
  Text,
  // TouchableHighlight,
  // findNodeHandle,
  // NativeModules,
  // TouchableOpacity,
} from 'react-native';
// import { CustomButton } from '../../../components/Icon';

import PropTypes from 'prop-types';
import styles from './AnserSummarization.scss';
import Svg from '../../../../components/Svg';

class AnserSummarization extends Component {
  // constructor(props) {
  //   super(props);
  //   // 这样子写没什么特别之处，就是我懒得每个用到的地方都去解构
  //   // this.type = props.type;
  //   // this.isItCorrect = props.isItCorrect;
  //   // this.status = props.status;
  //   // this.difficultyDegree = props.difficultyDegree;
  //   // this.questionType = props.questionType;
  //   // this.correctAnser = props.correctAnser;
  //   // this.studentAnser = props.studentAnser;
  //   // this.score = props.score;
  //   this.state = {
  //     showPopover: false,
  //     popoverAnchor: {},
  //   };
  // }

  getTextColor=() => {
    // :#fa5656 :#30bf6c; :#f5a623; :#ffffff
    // 0 错误   1正确   2对一些   3默认
    const color = ['#fa5656', '#30bf6c', '#f5a623', '#666666'];

    return color[0];
  }

  getText = (type, questionType) => {
    const {
      correctAnser, studentAnser, score,
    } = this.props;
    // console.log(questionType, 'getTextgetTextgetText');
    // 主观题客观题的展示效果不一样，五种状态下的展示也不一样。文档敢写详细点？
    const allText = {
      E: {
        sub: `回答错误，得分：${score}分`,
        obj: `回答错误，答案是${correctAnser}，你的答案是${studentAnser}，得分：${score}分`,
      },
      H: {
        sub: '回答错误',
        obj: `回答错误，答案是${correctAnser}，你的答案是${studentAnser}，得分：${score}分`,
      },
    };

    return allText[type][questionType];
  }


  // 考试的
  examinationSummary=() => {
    const { type, questionType } = this.props;
    const iconArr = ['wrongIcon', 'corectIcon', 'partialCorrect'];
    return (
      <View style={[styles.AnserSummarization, { justifyContent: 'flex-start' }]}>
        {
          // icon不一定会展示,没教师或者同学修改不展示
          <Svg height="40" width="40" source={iconArr[0]} fill="#fff" />
        }

        <Text
          style={[styles.text, { color: this.getTextColor(type, questionType) }, styles.textMargin]}
        >
          {this.getText(type, questionType)}
        </Text>
      </View>
    );
  }

  // 作业的
  //  humanCorrected: true, systemCorrected: true, result: 0, otherCorrected
  homeworkSummary=() => {
    const {
      difficultyDegree, type, questionType,
    } = this.props;
    const iconArr = ['wrongIcon', 'corectIcon', 'partialCorrect'];
    const colorArr = ['#fa5656', '#30bf6c', '#f5a623'];
    return (
      <View style={styles.AnserSummarization}>
        <View style={styles.leftTips}>
          {
          // icon不一定会展示,没教师或者同学修改不展示
            <Svg height="40" width="40" source={iconArr[0]} fill="#fff" />
        }

          <Text
            style={[styles.text, { color: this.getTextColor(type, questionType) }, styles.textMargin]}
          >
            {this.getText(type, questionType)}
          </Text>

          <View style={styles.difficultyView}>
            {/* <Text style={styles.difficultyDegree}>难易程度：</Text> */}
            <Text style={[styles.difficultyDegree, { backgroundColor: colorArr[difficultyDegree], color: '#ffffff' }]}>
              {['难', '易', '适中'][difficultyDegree]}
            </Text>
          </View>
        </View>

      </View>
    );
  }


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

  questionType: PropTypes.string,

  difficultyDegree: PropTypes.number,
  // 正确答案
  correctAnser: PropTypes.string,
  // 学生答案
  studentAnser: PropTypes.string,
  // 得分
  score: PropTypes.number,

};

AnserSummarization.defaultProps = {
  type: 'H',
  questionType: 'sub', // obj客观  sub主观
  difficultyDegree: 0, // 0难，1易，2适中
  // 正确答案
  correctAnser: '',
  // 学生答案
  studentAnser: '',
  // 得分
  score: 0,
};

export default AnserSummarization;
