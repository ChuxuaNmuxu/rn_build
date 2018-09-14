import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import CIcon from '../../../components/Icon';
import styles from './taskItem.scss';
import { mergeStyles } from '../../../utils/common';

class TaskItem extends React.Component {
  openTaskDetail = () => {
    console.log('打开任务详情页！');
    Actions.TaskDetail({
      // 跳转的时候把下面这些传给我，我的props那边设置了 isRequired 不传的话会报错
      // title: '6-22物理作业',
      // useTime: '15分钟',
      // endTime: '6-24 24:00',
      // beginTime: '今天',
      // waitReadOver: false,
    });
  }

  render() {
    const {
      wrapStyle, iconWrapStyle, iconStyle, isShowSpendTime,
    } = this.props;
    return (
      <TouchableNativeFeedback
        onPress={this.openTaskDetail}
      >
        <View style={mergeStyles(styles.task, wrapStyle)}>
          <View style={mergeStyles(styles.icon_box, iconWrapStyle)}>
            <CIcon style={mergeStyles(styles.icon, iconStyle)} name="wendang1" size={25} />
          </View>
          <View>
            <Text>{this.props.item.index}</Text>
            <Text style={[styles.subject]} ellipsizeMode="tail" numberOfLines={1}>
              6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业
            </Text>
            {
              isShowSpendTime && <Text style={styles.details}>预计耗时：15′</Text>
            }
            <Text style={styles.details}>截止提交时间：6-24 24:00</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
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
