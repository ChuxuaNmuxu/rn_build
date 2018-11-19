import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import styles from './recordCard.scss';
import CIcon from '../../../../components/Icon';
import NotViewImg from '../../../../public/img/notView.png';
import { formatTimeToshow } from '../../../../utils/common/common';
import { adaptiveRotation } from '../../../../utils/resolution';

const getIconNameFun = (subjectName) => {
  let iconName;
  switch (subjectName) {
    case '语文':
      iconName = 'yuwen2';
      break;
    case '化学':
      iconName = 'huaxue1';
      break;
    case '生物':
      iconName = 'shengwu1';
      break;
    case '英语':
      iconName = 'yingyu1';
      break;
    case '地理':
      iconName = 'dili1';
      break;
    case '历史':
      iconName = 'lishi1';
      break;
    case '数学':
      iconName = 'shuxue1';
      break;
    case '物理':
      iconName = 'wuli1';
      break;
    case '政治':
      iconName = 'sixiangpinde';
      break;
    case '音乐':
      iconName = 'yinle';
      break;
    case '美术':
      iconName = 'meishu';
      break;
    case '计算机':
      iconName = 'jisuanji';
      break;
    default:
      iconName = 'zuoye2';
  }
  return iconName;
};

class RecordCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textWidth: 0, // 作业名称及考试名称部分需要固定的宽度，超出部分展示省略号
    };
  }

  componentDidMount() {
    this.getTextWidth();
    // 监听屏幕旋转
    Dimensions.addEventListener('change', () => {
      this.getTextWidth();
    });
  }

  // 移除监听
  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      this.getTextWidth();
    });
  }

  // 通过adaptiveRotation函数去取作业题目部分的固定宽度
  getTextWidth = () => {
    const { width } = adaptiveRotation();
    const textWidth = width - 530;
    this.setState({
      textWidth,
    });
  }

  // 判断zuoye状态
  getRecordState=(type, accuracyData) => {
    switch (type) {
      case 0:
        // console.log(type);
        return '批改中';
      case 1:
        // console.log(type);
        return `正确率：${accuracyData}`;
      default:
        console.log(type);
        return '过截止时间未提交';
    }
  }

    // 判断zuoye状态
    getExanState=(type, accuracyData) => {
      switch (type) {
        case 0:
          // console.log(type);
          return '批改中';
        case 1:
          // console.log(type);
          return `得分：${accuracyData}`;
        default:
          console.log(type);
          return '未考试';
      }
    }

    // 如果当前这份作业记录参与了pk,则返回比赛结果--game：作业是否参与比赛,gameResult：0:没有结果（待定） 1:胜利（胜） 2:平手（平） 3:失败（败）
    getGameResult = (gameResult) => {
      let result;
      if (gameResult) {
        if (gameResult === 3) {
          result = '败';
        } else if (gameResult === 2) {
          result = '平';
        } else {
          result = '胜';
        }
      } else {
        result = '待定';
      }
      return result;
    }

  // 点击 去订正/去补做
  toReviseFun = () => {
    console.log(666, '去订正');
    Actions.HomeworkTask();
  }

  // 点击卡片进入详情页
  gotoDetailFun = () => {
    const { gotoDetailFun, datas } = this.props;
    gotoDetailFun(datas.id, datas.publishTime, datas.subjectName, datas.resultRead);
  }

  render() {
    const { datas, recordType } = this.props;
    const { textWidth } = this.state;
    const accuracyData = `${Math.round(datas.accuracy * 100)}%`;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.recordCard]}
        onPress={this.gotoDetailFun}
      >
        <View style={styles.cardLeft}>
          <View style={styles.subjectPic}>
            <CIcon style={styles.subjectIcon} name={getIconNameFun(datas.subjectName)} />
          </View>
          <View style={styles.subjectInfo}>
            <View style={styles.titles}>
              <Text style={[styles.subjectName, { maxWidth: textWidth }]} ellipsizeMode="tail" numberOfLines={1}>
                {datas.title}
              </Text>
              <Text style={[datas.game ? styles.gameResult : { width: 0, height: 0 }]}>
                {this.getGameResult(parseInt(datas.gameResult))}
              </Text>
            </View>
            <View style={styles.bottomInfo}>
              <Text
                style={[styles.otherInfo, { color: datas.type === 0 ? '#f5a623' : '#999999' }]}
              >
                {
                  recordType === 0
                    ? this.getRecordState(datas.type, accuracyData)
                    : this.getExanState(datas.type, datas.accuracy)}
              </Text>
              <Text style={styles.otherInfo}>{formatTimeToshow(datas.publishTime)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardRight}>
          {
            // 当前仅有补做，以后还有订正
            recordType === 0 && datas.unknownRedo && datas.type === 'yuqi' ? (
              <TouchableOpacity
                // disabled={randomNum > 0.5} randomNum > 0.5 && styles.disabledBox, randomNum > 0.5 && styles.disabledText
                onPress={() => this.toReviseFun()}
              >
                <View style={[styles.toReviseBox]}>
                  <Text style={[styles.toReviseText]}>
                    去补做
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null
          }

        </View>
        {
            datas.resultRead === 1 && (
            <Image
              style={styles.notViewStyles}
              source={NotViewImg}
            />)
          }
      </TouchableOpacity>
    );
  }
}

RecordCard.propTypes = {
  datas: PropTypes.object.isRequired,
  gotoDetailFun: PropTypes.func.isRequired,
  recordType: PropTypes.number.isRequired,
};

export default RecordCard;
