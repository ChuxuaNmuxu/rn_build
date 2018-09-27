import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import CIcon from '../../../components/Icon';
import styles from './taskItem.scss';
import { mergeStyles } from '../../../utils/common';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      wrapStyle, iconWrapStyle, iconStyle, isShowSpendTime, refs,
    } = this.props;

    return (
      <View style={mergeStyles(styles.task, wrapStyle)} ref={refs}>
        <View style={mergeStyles(styles.icon_box, iconWrapStyle)}>
          <CIcon style={mergeStyles(styles.icon, iconStyle)} name="wendang1" size={25} />
        </View>
        <View>
          {/* <Text>{this.props.data.index}</Text> */}
          <Text style={[styles.subject]} ellipsizeMode="tail" numberOfLines={1}>
              6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业
          </Text>
          {
              isShowSpendTime && <Text style={styles.details}>预计耗时：15′</Text>
            }
          <Text style={styles.details}>截止提交时间：6-24 24:00</Text>
        </View>
      </View>
    );
  }
}

TaskItem.propTypes = {
  wrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  iconWrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  iconStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  isShowSpendTime: PropTypes.bool,
};

TaskItem.defaultProps = {
  wrapStyle: {},
  iconWrapStyle: {},
  iconStyle: {},
  isShowSpendTime: true,
};

export default TaskItem;
