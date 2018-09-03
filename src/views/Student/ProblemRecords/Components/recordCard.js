import React, { Component } from 'react';
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
import { formatTimeToshow } from '../../../../utils/common';

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

class RecordCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // 点击 去订正/去补做
  toReviseFun = () => {
    console.log(666, '去订正');
  }

  render() {
    const { datas } = this.props;
    const accuracyData = `${Math.round(parseInt(datas.accuracy) * 100)}%`;
    return (
      <View style={[styles.recordCard]}>
        <View style={styles.cardLeft}>
          <View style={styles.subjectPic}>
            <CIcon style={styles.subjectIcon} name={getIconNameFun(datas.subjectName)} />
          </View>
          <View>
            <Text style={[styles.subjectName]} ellipsizeMode="tail" numberOfLines={1}>{datas.title}</Text>
            <Text style={styles.otherInfo}>正确率：{accuracyData}</Text>
            <Text style={styles.otherInfo}>{formatTimeToshow(datas.publishTime)}</Text>
          </View>
        </View>
        <View style={styles.cardRight}>
          <TouchableOpacity style={styles.filterMoreBox} onPress={() => this.toReviseFun()}>
            <Text style={styles.filterMoreText}>
              去订正
            </Text>
          </TouchableOpacity>
          {
            datas.resultRead === '1' && (
            <Image
              style={styles.notViewStyles}
              source={NotViewImg}
            />)
          }
        </View>
      </View>
    );
  }
}

RecordCard.propTypes = {
  datas: PropTypes.object.isRequired,
};

export default RecordCard;
