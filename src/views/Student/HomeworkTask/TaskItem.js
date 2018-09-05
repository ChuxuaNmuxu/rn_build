import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import CIcon from '../../../components/Icon';

const Styles = StyleSheet.create({
  task: {
    alignItems: 'center',
    padding: 24,
    marginLeft: 24,
    width: 450,
    height: 168,
    backgroundColor: '#54cc82',
    borderRadius: 5,
  },
  icon_box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
    height: 96,
    width: 96,
    backgroundColor: '#fff',
    borderRadius: 48,
  },
  icon: {
    fontSize: 60,
    color: '#54cc82',
  },
  flex_row: {
    flexDirection: 'row',
  },
  subject: {
    fontSize: 24,
    color: '#fff',
    width: 450 - 96 - 24 * 3,
  },
  details: {
    fontSize: 18,
    color: '#fff',
  },
});

class TaskItem extends React.Component {
  openTaskDetail = () => {
    console.log('打开任务详情页！');
  }
  render () {
    return (
      <TouchableNativeFeedback
        onPress={this.openTaskDetail}
      >
        <View style={[Styles.flex_row, Styles.task]}>
          <View style={Styles.icon_box}>
            <CIcon style={Styles.icon} name="wendang1" size={25} />
          </View>
          <View>
            <Text style={[Styles.subject]} ellipsizeMode="tail" numberOfLines={1}>6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业</Text>
            <Text style={Styles.details}>预计耗时：15′</Text>
            <Text style={Styles.details}>截止提交时间：6-24 24:00</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  } 
}

export default TaskItem;
