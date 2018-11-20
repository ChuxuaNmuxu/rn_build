import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Task from '../component/Task';
import styles from './planItem.scss';

const PlanItem = (props) => {
  const onPress = () => {
    const {
      title,
      estimatedCost: useTime,
      endTime,
      scheduledStart,
      scheduledEnd,
      taskType, // 任务类型[1:作业任务,2:补做任务3:订正任务,4:批阅任务] ,
      homeworkId,
      previewed,
      game, // 此份作业是否参与比赛
      gameType, // 用户参加比赛的类型，比赛分组：1单人，2双人，3三人，10漏选
      rivals, // 比赛对手姓名集合
      teammates, // 比赛队友姓名集合
    } = props.data;
    // 如果此份作业参与了比赛且为作业任务，则将比赛数据传给TaskDetail页面
    let gameData = {};
    if (taskType === 1 && game) {
      gameData = { gameType, rivals, teammates };
    }
    let beginTime = moment().format('YYYY-MM-DD');
    if (scheduledStart) {
      beginTime = `${scheduledStart}~${scheduledEnd}`;
    }

    // console.log(666, waitReadOver);
    if (taskType === 4) {
      // 待批阅作业
      Actions.TaskDetail({
        title,
        endTime: moment(endTime).format('YYYY-MM-DD HH:mm'),
        waitReadOver: true,
        homeworkId,
        taskType,
        beginTime,
      });
    } else {
      // 要做的作业
      Actions.TaskDetail({
        title,
        useTime: `${useTime}分钟`,
        endTime: moment(endTime).format('YYYY-MM-DD'),
        beginTime,
        waitReadOver: false,
        homeworkId,
        previewed,
        taskType,
        gameData,
      });
    }
  };


  const { type, ...rest } = props;

  const renderTask = () => (
    <Task
      {...rest}
      iconWrapStyle={type === 'breviaryTask' ? styles.icon_wrap_style : styles.showIconOnlyTask_icon_style}
      iconStyle={type === 'breviaryTask' ? styles.icon : styles.icon}
      wrapStyle={type === 'breviaryTask' ? styles.wrap_style : styles.showIconOnlyTask_wrap_style}
      type={type}
      onPress={onPress}
    />
  );

  return (
    <View style={styles.wrap}>
      {
          renderTask()
        }
    </View>
  );
};

PlanItem.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
};

PlanItem.defaultProps = {
  type: null,
  data: {},
};

export default PlanItem;
