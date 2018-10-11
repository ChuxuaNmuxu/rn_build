import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Task from '../component/Task';
import styles from './planItem.scss';

const PlanItem = (props) => {
  const onPress = () => { console.log('做作业'); };
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
};

PlanItem.defaultProps = {
  type: null,
};

export default PlanItem;
