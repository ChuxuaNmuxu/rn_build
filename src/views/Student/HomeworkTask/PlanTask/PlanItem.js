import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Task from '../component/Task';
import CIcon from '../../../../components/Icon';
import styles from './planItem.scss';

const PlanItem = (props) => {
  const onPress = () => { console.log('做作业'); };
  const { type, ...rest } = props;

  const renderTask = () => {
    if (type === 2) {
      return (
        <Task
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

PlanItem.propTypes = {
  type: PropTypes.number,
};

PlanItem.defaultProps = {
  type: null,
};

export default PlanItem;
