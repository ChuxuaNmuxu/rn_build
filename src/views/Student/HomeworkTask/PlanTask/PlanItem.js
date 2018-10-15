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
      // beginTime: scheduledNode,
      taskType: waitReadOver,
      homeworkId,
    } = props.data;
    Actions.TaskDetail({
      title,
      useTime: `${useTime}分钟`,
      endTime: moment(endTime).format('MM-DD HH:mm'),
      // beginTime: '占位',
      waitReadOver: !(waitReadOver < 4),
      homeworkId,
    });
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