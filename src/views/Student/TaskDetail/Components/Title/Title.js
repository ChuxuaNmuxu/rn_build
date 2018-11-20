import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import R from 'ramda';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './Title.scss';

// 处理下做作业时的竞争提示
const getGameNotice = (gameData) => {
  // gameType,  用户参加比赛的类型，比赛分组：1单人，2双人，3三人，10漏选
  // rivals,    比赛对手姓名集合
  // teammates, 比赛队友姓名集合
  const { gameType, rivals, teammates } = gameData;
  let notice;
  if (gameType === 10) {
    notice = '很遗憾本次作业未能帮你挑选到合适的PK对手，希望你能继续加油哦！';
  } else if (gameType === 1) {
    notice = `本次作业你需要和${rivals.join('、')}同学一决高下，胜利者将会获得更多积分哦，加油吧！`;
  } else {
    notice = `本次作业你和${teammates.join('、')}同学成为一组，你们将和${rivals.join('、')}同学组成的队伍进行PK，胜利者将会获得更多积分哦，加油吧！`;
  }
  return notice;
};

const Title = ({ waitReadOver, title, gameData }) => {
  const temTitle = waitReadOver ? `${title}-批阅` : title;
  return (
    <View style={styles.title_wrap}>
      <View style={styles.title_icon}>
        <TouchableOpacity onPress={Actions.Student}>
          <Entypo name="chevron-thin-left" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{temTitle}</Text>
      {/* 做作业时展示竞争提示 */}
      {
        !R.isEmpty(gameData) && <Text style={styles.complete_info}>{getGameNotice(gameData)}</Text>
      }
    </View>
  );
};
Title.propTypes = {
  // 标题
  title: PropTypes.string.isRequired,
  // 是否待批阅(默认false，如果是true 则是待批阅)
  waitReadOver: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
};

export default Title;
