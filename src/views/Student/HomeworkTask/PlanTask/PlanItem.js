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
      taskType,
      homeworkId,
      previewed,
    } = props.data;

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
