import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './recordCard.scss';
import CIcon from '../../../../components/Icon';
import NotViewImg from '../../../../public/img/notView.png';
import { formatTimeToshow } from '../../../../utils/common/common';

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
    };
  }

  // 判断zuoye状态
  getRecordState=(type, accuracyData) => {
    switch (type) {
      case '0':
        // console.log(type);
        return '批改中';
      case '1':
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
        case '0':
          // console.log(type);
          return '批改中';
        case '1':
          // console.log(type);
          return `得分：${accuracyData}`;
        default:
          console.log(type);
          return '未考试';
      }
    }

  // 点击 去订正/去补做
  toReviseFun = () => {
    console.log(666, '去订正');
  }

  // 点击卡片进入详情页
  gotoDetailFun = () => {
    const { gotoDetailFun, datas } = this.props;
    gotoDetailFun(datas.id);
  }


  render() {
    const { datas, recordType } = this.props;
    const accuracyData = `${Math.round(parseInt(datas.accuracy) * 100)}%`;
    const randomNum = Math.random();
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
            <Text style={[styles.subjectName]} ellipsizeMode="tail" numberOfLines={1}>{datas.title}</Text>
            <View style={styles.bottomInfo}>
              <Text
                style={[styles.otherInfo, { color: datas.type === '0' ? '#f5a623' : '#999999' }]}
              >
                {
                  recordType === 0
                    ? this.getRecordState(datas.type, accuracyData)
                    : this.getExanState(datas.type, accuracyData)}
              </Text>
              <Text style={styles.otherInfo}>{formatTimeToshow(datas.publishTime)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardRight}>
          {
            recordType === 0 ? (
              <TouchableOpacity
                disabled={randomNum > 0.5}
                onPress={() => this.toReviseFun()}
              >
                <View style={[styles.toReviseBox, randomNum > 0.5 && styles.disabledBox]}>
                  <Text style={[styles.toReviseText, randomNum > 0.5 && styles.disabledText]}>
                去订正
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null
          }

        </View>
        {
            datas.resultRead === '1' && (
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
