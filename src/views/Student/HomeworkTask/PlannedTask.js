import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import TaskItem from './TaskItem';
import CIcon from '../../../components/Icon';
import styles from './plannedTask.scss';

const PlannedTask = (props) => {
  const onPress = () => { console.log('做作业'); };
  const { type, ...rest } = props;
  const renderTask = () => {
    if (type === 2) {
      return (
        <TaskItem
          {...rest}
          iconWrapStyle={styles.icon_wrap_style}
          iconStyle={styles.icon}
          wrapStyle={styles.wrap_style}
          isShowSpendTime={false}
        />
      );
    }
    return (
      <View style={styles.box}>
        <View style={styles.border}>
          <CIcon style={styles.icon} name="wendang1" size={25} />
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrap}>
        {
          renderTask()
        }
      </View>
    </TouchableOpacity>
  );
};

export default PlannedTask;
