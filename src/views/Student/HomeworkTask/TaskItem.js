import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import CIcon from '../../../components/Icon';
import styles from './taskItem.scss';

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
    return (
      <TouchableNativeFeedback
        onPress={this.openTaskDetail}
      >
        <View style={[styles.task]}>
          <View style={styles.icon_box}>
            <CIcon style={styles.icon} name="wendang1" size={25} />
          </View>
          <View>
            <Text style={[styles.subject]} ellipsizeMode="tail" numberOfLines={1}>
              6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业
            </Text>
            <Text style={styles.details}>预计耗时：15′</Text>
            <Text style={styles.details}>截止提交时间：6-24 24:00</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default TaskItem;
